export default defineNuxtRouteMiddleware(() => {
  const config = useRuntimeConfig()
  if (config.public.theme === 'dark') {
    useHead({
      htmlAttrs: {
        class: 'theme-dark',
      },
    })
  }
})
