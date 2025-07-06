import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type ErrorResponse = {
  message?: string;
  error?: string;
};

export function usePost<T = unknown, R = unknown>(url: string) {
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
        },
        withCredentials: true,
      });

      setData(response.data);
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      const responseData = axiosError.response?.data;

      setError(
        responseData?.message ||
        responseData?.error ||
        axiosError.message ||
        'Unexpected error'
      );
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error };
}