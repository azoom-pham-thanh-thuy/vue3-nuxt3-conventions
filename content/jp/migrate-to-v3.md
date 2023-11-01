---
title: 'Migrate To V3'

description: 'Vue 3 - Nuxt 3'
---

# V3に移行
**V3で注意すべきいくつかのテクノロジーが使用されるでしょう:**
- Vue 3 をサポートした Router, Devtools, test utils の新バージョン
- ビルドツールチェーン: [Vite](https://ja.vitejs.dev//)
- 状態管理: [Pinia](https://pinia.vuejs.org/)
- IDE サポート: [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- フレームワーク: [Nuxt](https://nuxt.com/)

## 基本的なケーススタディ:
**C1. Piniaを使用してストアを設定する（[Setup Stores](https://pinia.vuejs.org/core-concepts/#Setup-Stores)構文に従う）**  
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

**C2. [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html) を使用したコンポーネント**
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

[ホームに戻る >](/)
