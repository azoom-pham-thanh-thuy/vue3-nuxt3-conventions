---
title: 'Migrate To V3'

description: 'Vue 3 - Nuxt 3'
---

# Migrate To V3
**Some technologies to take note of will be used in V3:**
- New versions of Router, Devtools & test utils w/ Vue 3 support
- Build Toolchain: [Vite](https://vitejs.dev/)
- State Management: [Pinia](https://pinia.vuejs.org/)
- IDE Support: [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Framework: [Nuxt](https://nuxt.com/)

## Basic case study:
**C1. Declare a store using Pinia (With the [Setup Stores](https://pinia.vuejs.org/core-concepts/#Setup-Stores) syntax)**  
```js
// stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const name = ref<string>('Cristiano')
  const count = ref<number>(0)

  const doubleCount = computed<number>(() => count.value * 2)

  function increment(): void {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```

**C2. Component using [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)**
```vue
// components/counter.vue
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '~/stores/counter'

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
const { increment } = counterStore
</script>

<template>
  <p class="count">Current Count: {{ count }}</p>
  <p class="double-count">Double Count: {{ doubleCount }}</p>
  <button class="button -increment" @click="increment">Increment</button>
</template>

<style lang="scss" scoped></style>
```

[Back Home >](/)
