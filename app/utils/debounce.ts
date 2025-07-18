export default function debounce<T extends (...args: any[]) => any>(func: T, delay: number = 1000) {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    clearTimeout(timeout)

    return new Promise(res => {
      timeout = setTimeout(() => {
        res(func(...args))
      }, delay)
    })
  }
}
