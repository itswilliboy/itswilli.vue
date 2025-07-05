// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
    "/spotify": { prerender: true }
  },

  // postcss: {
  //   plugins: {
  //     tailwindcss: {},
  //     autoprefixer: {}
  //   }
  // },

  runtimeConfig: {
    LAST_FM_TOKEN: "",
    TMDB_TOKEN: "",
    public: {
      LAST_FM_USERNAME: "ItsWilliboy"
    }
  },

  vite: {
    plugins: [tailwindcss()]
  },

  modules: ["@nuxt/image", "@nuxt/icon"],
  compatibilityDate: "2024-09-14"
})
