<script setup>
const socials = [
  {
    href: "https://discord.com/users/263602820496883712",
    icon: "/discord.svg",
  },
  {
    href: "https://github.com/itswilliboy",
    icon: "/github.svg",
  },
]
</script>

<template>
  <div class="flex h-screen w-screen justify-center bg-background font-semibold text-white">
    <div class="flex flex-col">
      <div class="mt-32 flex flex-row justify-center">
        <div class="flex flex-col justify-center">
          <h2 class="text-2xl">Hi, you may know me as</h2>
          <h1 class="h-32 text-[10rem] font-bold leading-[.7] text-primary">Willi</h1>
        </div>
        <img class="ml-6 h-64 w-64 rounded-lg" src="/milo.jpg" alt="pfp" />
      </div>
      <div class="mt-8 flex flex-col items-center justify-center gap-6">
        <div class="flex flex-row justify-center gap-8">
          <template v-for="item in socials">
            <a
              :href="item.href"
              :target="item.target || '_blank'"
              class="inline-flex h-14 w-14 items-center justify-center gap-2 rounded-lg bg-primary p-4 transition-colors hover:bg-primary/80"
            >
              <img :src="item.icon" alt="GitHub logo" class="h-6 w-6" />
            </a>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
