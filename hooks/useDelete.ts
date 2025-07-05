import { useState } from "react";
import axios, { AxiosError } from "axios";

interface UseDeleteResult {
  loading: boolean;
  error: string | null;
  deleteData: (url: string, payload: any) => Promise<any>;
}

export function useDelete(): UseDeleteResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteData = async (url: string, payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(url, {
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(
        (axiosError.response?.data as any)?.error ||
        axiosError.message ||
        "Something went wrong"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, deleteData };
}