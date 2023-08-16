<script lang="ts" setup>
withDefaults(defineProps<{ href?: string }>(), { href: '/' })
</script>

<template>
  <NuxtLink :to="href" class="logo inline-block w-[8rem] md:w-[10rem] h-[3.5rem] invert" />
</template>

<style scoped>
.logo {
  background: url(/images/logo.svg) 50% / contain no-repeat;
}
</style>
