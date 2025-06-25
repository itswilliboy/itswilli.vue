<script setup lang="ts">
const isOpen = ref<boolean>(false)
</script>

<template>
  <div class="bg-light-bg flex h-max w-14 flex-col overflow-x-hidden rounded-md p-2">
    <span class="flex" @click="isOpen = !isOpen">
      <Icon
        name="solar:hamburger-menu-broken"
        size="40"
        class="cursor-pointer opacity-50 invert transition-[rotate]"
        :class="isOpen && 'rotate-90'" />
    </span>
    <div class="grid max-h-0 grid-rows-[0fr] overflow-auto transition-[max-height]" :class="isOpen && 'max-h-32'">
      <slot />
    </div>
  </div>
</template>
