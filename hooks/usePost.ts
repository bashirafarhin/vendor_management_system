import { useState } from 'react';
import axios, { AxiosError } from 'axios';

export function usePost<T = any, R = any>(url: string) {
  const [data, setData] = useState<R | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const post = async (body: T): Promise<R | undefined> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<R>(url, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<any>;
      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message);
      } else {
        setError(axiosError.message || 'Unexpected error');
      }
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
}