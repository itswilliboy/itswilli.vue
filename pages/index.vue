<script setup>
const items = ["Placeholder", "Placeholder", "Placeholder"]
</script>

<template>
  <div class="flex h-screen w-screen justify-center bg-background font-semibold text-white">
    <div class="flex flex-col">
      <div class="mt-32 flex flex-row justify-center">
        <div class="flex flex-col justify-center">
          <h2 class="text-2xl">Hi, You may know me as</h2>
          <h1 class="h-32 text-[10rem] leading-[.7] text-primary">Willi</h1>
        </div>
        <img class="ml-6 rounded-lg" width="256" height="256" src="/milo.jpg" alt="pfp" />
      </div>
      <h3 class="mt-6 text-center text-xl">You should check these out</h3>
      <div class="mt-8 flex flex-row justify-evenly">
        <template v-for="item in items">
          <a
            href="#"
            class="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-4 transition-colors hover:bg-primary/80"
          >
            <img src="/github.svg" alt="GitHub logo" class="h-6 w-6" />
            <span class="text-lg">{{ item }}</span>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>
