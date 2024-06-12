export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number,
): T & { cancel(): void } {
  let timer: NodeJS.Timeout | null = null;

  const debounced = (...args: Parameters<T>): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };

  debounced.cancel = () => {
    if (timer !== null) {
      clearTimeout(timer);
    }
  };

  return debounced as T & { cancel(): void };
}
