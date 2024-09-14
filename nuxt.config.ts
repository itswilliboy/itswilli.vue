// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },

  runtimeConfig: {
    LAST_FM_TOKEN: "",
    public: {
      LAST_FM_USERNAME: "ItsWilliboy"
    }
  },

  modules: ["@nuxt/image", "@nuxt/icon"],
  compatibilityDate: "2024-09-14"
})
