<script setup lang="ts">
const items = [
  {
    title: "What sensitive information do we (Harmony) store?",
    value: `
        If the user is using our AniList-integration by logging in using their AniList account,
        the user's OAuth2 access token will be stored from the time of the successful login, to the time of logging out.
        ~~When the user logs out, all login-related information is deleted permanently until the next login.
      `
  },
  {
    title: "How do we use the aforementioned information?",
    value: `
      We solely use the user's OAuth2 access token to make requests on their behalf to the AniList API.
      All sent requests require user interaction.
      ~~All requests are read-only, meaning no requests are sent to write data on behalf of the user.
    `
  },
  {
    title: "Do we share any sensitive data with 3rd-party sources?",
    value: "No."
  }
]
</script>

<template>
  <div class="bg-background flex h-screen w-screen items-center justify-center">
    <div class="bg-light-bg flex h-5/6 w-[300px] flex-col overflow-y-auto rounded-lg text-white md:w-[500px]">
      <div class="flex h-24 flex-col items-center justify-center py-4 md:py-0">
        <NuxtLink to="/bot" class="hover:underline">
          <h1 class="text-2xl font-semibold md:text-4xl">Harmony Privacy Policy</h1>
        </NuxtLink>
      </div>
      <div class="flex justify-center">
        <div class="w-4/5 rounded-lg border-2 border-white/50"></div>
      </div>
      <div class="flex-1 px-10 py-8">
        <ul class="space-y-4">
          <li v-for="item in items">
            <div class="flex flex-col gap-2">
              <h2 class="text-md font-semibold underline md:text-2xl">{{ item.title }}</h2>
              <p v-html="item.value.replaceAll('~', '<br />')"></p>
            </div>
          </li>
        </ul>
      </div>
      <p class="pb-2 text-center text-white/50">Harmony is not affiliated with AniList.</p>
    </div>
  </div>
</template>
