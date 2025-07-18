<script setup lang="ts">
import CountUp from "vue-countup-v3"
const { runtime } = defineProps<{ runtime: number }>()
const oldRuntime = ref<number>(0)

watch(
  () => runtime,
  (_, old) => (oldRuntime.value = old)
)

const getTime = (minutes: number): [number, number] => [Math.floor(minutes / 60), minutes % 60]
const oldTime = computed(() => getTime(oldRuntime.value))
const newTime = computed(() => getTime(runtime))
</script>

<template>
  <div class="flex flex-col items-center justify-center text-white">
    <h1 class="flex text-5xl">
      <CountUp :start-val="oldRuntime" :end-val="runtime" />
      &nbsp;minutes
    </h1>
    <h2 class="flex text-xl">
      <CountUp :start-val="oldTime[0]" :end-val="newTime[0]" />
      h
      <CountUp :start-val="oldTime[1]" :end-val="newTime[1]" />
      m
    </h2>
  </div>
</template>
