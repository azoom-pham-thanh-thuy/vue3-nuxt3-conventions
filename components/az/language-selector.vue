<script lang="ts" setup>
const locales = ref<string[]>(["en", "vi"]);
const { locale, existedLocale } = useLocale();

function changeLanguage(event: any) {
  localStorage.setItem("lang", event?.target?.value || "en");
  locale.value = event?.target?.value;
}
</script>

<template>
  <select
    class="select h-10 flex-shrink-0 z-10 inline-flex items-center px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
    @change="changeLanguage">
    <option v-for="locale in locales" class="option" :value="locale" :selected="locale === existedLocale">
      {{ locale.toUpperCase() }}
    </option>
  </select>
</template>
