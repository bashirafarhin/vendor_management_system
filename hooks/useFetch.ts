import { useEffect, useState } from 'react';
import axios, { AxiosError, CancelTokenSource } from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

type ErrorResponse = {
  message?: string;
  error?: string;
};

export function useFetch<T = unknown>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const source: CancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<T>(url, {
          cancelToken: source.token,
          withCredentials: true,
        });
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
          setError(
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            axiosError.message ||
            'Something went wrong'
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      source.cancel('Component unmounted or URL changed');
    };
  }, [url]);

  return { data, loading, error };
}