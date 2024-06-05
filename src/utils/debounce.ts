export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  timeout: number,
): (...funcArgs: Parameters<T>) => void {
  let timer: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
