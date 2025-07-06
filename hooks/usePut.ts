import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type ErrorResponse = {
  message?: string;
  error?: string;
};

export function usePut<T = unknown, R = unknown>(url: string) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const put = async (body: T): Promise<R | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put<R>(url, body, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const res = axiosError.response?.data;

      setError(res?.message || res?.error || axiosError.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return { put, data, loading, error };
}