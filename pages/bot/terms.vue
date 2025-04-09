<script setup lang="ts">
const items = [
  "You may not use the application outside of its intended use, such as (but not limited to) exploiting unintended bugs found in the application.",
  "You may not intentionally abuse the application, such as (but not limited to) spamming commands."
]
</script>

<template>
  <div class="bg-background flex h-screen w-screen items-center justify-center">
    <div class="flex h-5/6 w-[300px] flex-col overflow-y-auto rounded-lg bg-white/10 text-white md:w-[500px]">
      <div class="flex h-24 flex-col items-center justify-center py-4 md:py-0">
        <a href="/bot" class="hover:underline">
          <h1 class="text-2xl font-semibold md:text-4xl">Harmony Terms of Service</h1>
        </a>
      </div>
      <div class="flex justify-center">
        <div class="w-4/5 rounded-lg border-2 border-white/50"></div>
      </div>
      <div class="flex-1 px-10 py-8">
        <ol class="list-decimal space-y-4 text-center">
          <li v-for="item in items">
            <p v-html="item.replaceAll('~', '<br />')"></p>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
