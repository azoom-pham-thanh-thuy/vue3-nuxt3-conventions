<script lang="ts" setup>
import { useLocale } from '~/composables/locale'
const route = useRoute()
const { locale, existedLocale } = useLocale()

console.log(66, existedLocale.value)

watch(() => locale.value, 
() => {
  console.log(8888888, locale.value, existedLocale.value)
  // $content.forceUpdate()
  // locale.value = existedLocale.value
})

</script>
<template>
  <div class="page-wrap">
    <AzHeader class="fixed top-0 left-0 w-full border-b" />
    <main class="main flex w-screen min-h-screen pt-[4.5rem] bg-gray-50">
      <AzSidebar class="h-screen fixed bg-white border-r border-t" />
      <div class="doc-wrap w-full my-8 ml-72">
        <ContentDoc :key="locale" :path="`/${locale}${route.path}`"
          class="content prose md:max-w-3xl lg:max-w-4xl mx-auto p-3 md:py-10 md:px-12 bg-white ring-gray-900/5 shadow-slate-700/10 shadow-xl"
        >
          <template #not-found>
            <AzLoading />
          </template>
        </ContentDoc>
      </div>
    </main>
  </div>
</template>
