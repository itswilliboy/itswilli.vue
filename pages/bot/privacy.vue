<script setup lang="ts">

const items = [
  {
    title: "What sensitive information do we (Harmony) store?",
    value: `
        If the user is using our AniList-integration by logging in using their AniList account,
        the user's OAuth2 access token will be stored from the time of the successful login, to the time of logging out.
        ~~When the user logs out, all login-related information is deleted permanentely until the next login.
      `
  },
  {
    title: "How do we use the afformentioned information?",
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
  <div class="w-screen h-screen bg-background flex justify-center items-center">
    <div class="text-white h-5/6 w-[500px] bg-white/10 rounded-lg flex flex-col">
      <div class="h-24 justify-center flex items-center flex-col ">
        <h1 class="text-4xl font-semibold">Harmony Privacy Policy</h1>
      </div>
      <div class="flex justify-center">
        <div class="w-4/5 border-2 rounded-lg border-white/50"></div>
      </div>
      <div class="flex-1 px-10 py-8">
        <ul class="space-y-4">
          <li v-for="item in  items ">
            <div class="flex gap-2 flex-col">
              <h2 class="text-2xl font-semibold underline">{{ item.title }}</h2>
              <p v-html="item.value.replaceAll('~', '<br />')"></p>
            </div>
          </li>
        </ul>
      </div>
      <p class="text-center pb-2 text-white/50">Harmony is not affiliated with AniList or AniChart.</p>
    </div>
  </div>

  <Footer />
</template>