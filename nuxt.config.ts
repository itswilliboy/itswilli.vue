// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],

  runtimeConfig: {
    LAST_FM_TOKEN: "",
    TMDB_TOKEN: "",
    SPOTIFY_CLIENT_ID: "",
    SPOTIFY_CLIENT_SECRET: "",
    public: {
      LAST_FM_USERNAME: "ItsWilliboy"
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  nitro: {
    preset: "bun"
  },

  image: {
    domains: ["https://lastfm.freetls.fastly.net", "https://i.scdn.co"]
  },

  modules: ["@nuxt/image", "@nuxt/icon"],
  compatibilityDate: "2024-09-14"
})
