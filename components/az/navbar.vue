<script lang="ts" setup>
const linkClasses = {
  base: 'link rounded-full transition duration-200 px-3 md:px-6 py-1 md:py-1.5 bg-inherit border hover:border-[#0c66ee] hover:shadow-md hover:shadow-[#0c66ee]/50',
  active: 'text-white bg-gradient-to-r from-[#6f9ee4] to-[#0c66ee]',
} as const
const routes = [
  {
    label: 'Breaking Changes',
    to: '/breaking-changes',
    class: linkClasses.base,
    activeClass: linkClasses.active,
  },
  {
    label: 'Style Guide',
    to: '/style-guide',
    class: linkClasses.base,
    activeClass: linkClasses.active,
  },
  {
    label: 'Migrate To V3',
    to: '/migrate-to-v3',
    class: linkClasses.base,
    activeClass: linkClasses.active,
  },
] as const
</script>

<template>
  <nav class="nav inline-flex items-center gap-x-3">
    <NuxtLink v-for="route in routes" :key="route.to" v-bind="route">
      {{ route.label }}
    </NuxtLink>
  </nav>
</template>
