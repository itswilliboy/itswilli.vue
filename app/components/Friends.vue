<script setup lang="ts">
defineProps<{ friends: Friend[] }>()
</script>

<template>
  <div class="bg-light-bg flex size-max gap-2 rounded-lg p-2">
    <Tooltip :text="friend.name" v-for="friend in friends" side="left">
      <NuxtLink :to="friend.href" target="_blank">
        <NuxtImg :src="`https://avatars.githubusercontent.com/u/${friend.githubID}`" class="w-12 rounded-lg hover:rotate-6 transition-[rotate] ease-in-out" />
      </NuxtLink>
    </Tooltip>
  </div>
</template>
