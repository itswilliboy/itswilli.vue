<script setup>
useSeoMeta({
  title: "Willi",
  ogTitle: "Willi",
  description: "Hello, you may know me as Willi!",
  ogDescription: "Hello, you may know me as Willi!"
})

const socials = [
  {
    href: "https://discord.com/users/263602820496883712",
    icon: "/discord.svg"
  },
  {
    href: "https://github.com/itswilliboy",
    icon: "/github.svg"
  }
]

const projects = [
  {
    name: "itswilli.vue",
    description: "This site. Built in Vue with Nuxt using TailwindCSS.",
    href: "https://github.com/itswilliboy/itswilli.vue",
    colour: "#41B783",
    icon: "skill-icons:nuxtjs-dark"
  },
  {
    name: "Harmony",
    description: "Harmony is a multipurpose Discord Bot built in Python using discord.py",
    href: "https://github.com/itswilliboy/Harmony",
    colour: "#3573A6",
    icon: "skill-icons:python-dark"
  },
  {
    name: "images-rust",
    description: "The backend for i.itswilli.dev, built in Golang",
    href: "https://github.com/itswilliboy/images-go",
    colour: "#00ADD8",
    icon: "skill-icons:golang"
  }
]

const { status, data: tracks } = await useLazyFetch("/api/spotify", { query: { limit: 1 }, server: false })
</script>

<template>
  <div class="bg-background flex min-h-screen w-screen justify-center pb-8 font-semibold text-white">
    <div class="flex flex-col">
      <div class="mt-32 flex flex-row justify-center">
        <div class="flex flex-col justify-center">
          <h2 class="text-md md:text-2xl">Hi, you may know me as</h2>
          <h1 class="text-primary h-32 text-[6rem] leading-[.8] font-bold md:text-[10rem] md:leading-[.7]">Willi</h1>
        </div>
        <NuxtImg class="ml-6 h-32 w-32 rounded-lg md:h-64 md:w-64" src="/milo.jpg" alt="pfp" />
      </div>

      <div class="mt-8 flex flex-col items-center justify-center gap-6">
        <Track :track="tracks[0]" to-page v-if="status === 'success'" />
        <div v-else class="h-28 w-72 animate-pulse rounded-lg bg-white/10"></div>
        <div class="flex flex-row justify-center gap-8">
          <div v-for="item in socials">
            <a
              :href="item.href"
              :target="item.target || '_blank'"
              class="bg-primary hover:bg-primary/80 inline-flex h-14 w-14 items-center justify-center gap-2 rounded-lg p-4 transition-colors">
              <NuxtImg :src="item.icon" alt="Logo" class="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div class="mt-8 flex flex-col items-center justify-center gap-4 overflow-y-auto lg:flex-row">
        <Project :project="project" v-for="project in projects" />
      </div>
    </div>
  </div>
</template>
