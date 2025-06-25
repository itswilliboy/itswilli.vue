export const useMousePosition = () => {
  const [x, y] = [ref<number>(0), ref<number>(0)]

  const update = (event: { pageX: number; pageY: number }) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => {
    window.addEventListener("mousemove", update)
  })
  onUnmounted(() => {
    window.addEventListener("mousemove", update)
  })

  return { x, y }
}
