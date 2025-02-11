export const useIntervalFn = (fn: () => void, ms: number) => {
  let timeout: NodeJS.Timeout
  onMounted(() => (timeout = setInterval(fn, ms)))
  onUnmounted(() => clearInterval(timeout))
}
