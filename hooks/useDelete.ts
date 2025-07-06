import { useState } from "react";
import axios, { AxiosError } from "axios";

interface UseDeleteResult<T> {
  loading: boolean;
  error: string | null;
  deleteData: (url: string, payload: T) => Promise<unknown | null>;
}

export function useDelete<T = unknown>(): UseDeleteResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string, payload: T): Promise<unknown | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url, {
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      const resData = axiosError.response?.data as { error?: string; message?: string } | undefined;
      setError(resData?.error || resData?.message || axiosError.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
}