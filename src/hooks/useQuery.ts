import { useEffect, useState, useRef, useTransition } from "react";

interface UseQueryOptions {
  enabled?: boolean;
}

type useQueryFn<T> = {
  queryKey: string[];
  queryFn: () => Promise<T>;
  options?: UseQueryOptions;
};

export const useQuery = <T>({ queryKey, queryFn, options }: useQueryFn<T>) => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const isMounted = useRef(true);
  const enabled = options?.enabled !== false;

  useEffect(() => {
    isMounted.current = true;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await queryFn();
        if (isMounted.current) {
          startTransition(() => {
            setData(result);
          });
        }
      } catch (err: unknown) {
        if (isMounted.current) {
          setError(err);
        }
      } finally {
        if (isMounted.current) {
          setIsLoading(false);
        }
      }
    };

    if (enabled) {
      fetchData();
    }

    return () => {
      isMounted.current = false;
    };
  }, [...queryKey, enabled]);

  return { isPending, isLoading, data, error };
};
