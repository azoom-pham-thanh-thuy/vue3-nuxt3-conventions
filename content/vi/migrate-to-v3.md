---
title: 'Migrate To V3'

description: 'Vue 3 - Nuxt 3'
---

# Chuyển sang V3
**Một số công nghệ cần lưu ý sẽ được sử dụng ở V3:**
- Versions mới của Router, Devtools và test utils có hỗ trợ Vue 3
- Build Toolchain: [Vite](https://vitejs.dev/)
- State Management: [Pinia](https://pinia.vuejs.org/)
- IDE Support: [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Framework: [Nuxt](https://nuxt.com/)

## Case study cơ bản:
**C1. Khai báo store sử dụng Pinia (Theo cú pháp [Setup Stores](https://pinia.vuejs.org/core-concepts/#Setup-Stores))**  
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

**C2. Component sử dụng [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)**
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

[Trở về Trang chủ >](/)
