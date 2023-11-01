const defaultLocale = "en";
const locale = ref<string>(defaultLocale);
const existedLocale = ref<string>(defaultLocale);

export function useLocale() {
  onMounted(() => {
    existedLocale.value = localStorage.getItem("lang") || defaultLocale;
    locale.value = existedLocale.value;
  });

  return {
    locale,
    existedLocale,
  };
}
