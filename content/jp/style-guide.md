---
title: 'Style Guide'

description: 'Vue 3 - Nuxt 3 Style Guide'
---


## [MUST / ALWAYS]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

A1. **常に、ベース/ジェネリックなコンポーネントは [az]{.text-red-500} フォルダーの中に配置してください。または、Nuxt を使用していない場合は、プレフィックスとして [az]{.text-red-500} を追加してください。**

- Vue:

  ```bash
  components/
  -| az-button.vue
  -| az-table.vue
  -| az-icon.vue
  ```

- Nuxt:

  ```bash
  components/
  -| az/
  --| button.vue
  --| table.vue
  --| icon.vue
  ```

A2. **常に、テンプレートとファイル名の両方で「kebab-case」を使用したマルチワードcomponent名を使用してください。**

  ```bash
  components/
  -| todo-item.vue
  -| az-input.vue
  ```

  ```html
  <todo-item />
  <az-input></az-input>
  ```

A3. **常に、最も高いレベルから最も低いレベルに単語を並べます。**

Componentの名前は、最上位の（一般的に最も一般的な）単語で始まり、説明的な修飾語で終わるべきです。

- Bad:

  ```bash
  pages/
  -| rooms/
  --| clear-search-button.vue
  --| run-search-button.vue
  --| exclude-from-search-input.vue
  --| launch-on-startup-checkbox.vue
  --| search-input.vue
  --| terms-checkbox.vue
  ```

- Good:

  ```bash
  pages/
  -| rooms/
  --| search-button-clear.vue
  --| search-button-run.vue
  --| search-input-query.vue
  --| search-input-exclude-glob.vue
  --| settings-checkbox-terms.vue
  --| settings-checkbox-launch-on-startup.vue
  ```

A4. **常に完全な単語のcomponent名を使用してください。**

Componentの名前は略語よりも完全な単語を好むべきです。
エディタの自動補完機能により、長い名前を書くコストは非常に低くなりますが、それによって提供される明瞭さは非常に貴重です。特に一般的でない略語は常に避けるべきです。

- Bad:

  ```bash
  pages/
  -| users/
  --| u-d-settings.vue
  --| u-prof-opts.vue
  ```

- Good:

  ```bash
  pages/
  -| users/
  --| user-dashboard-settings.vue
  --| user-profile-options.vue
  ```

A5. **必ずページのcomponentをcomponentのページフォルダに配置してください**

  ```bash
  components/
  -| rooms/
  --| page-component.vue

  pages/
  -| rooms/
  --| index.vue
  ```

A6. **常に、SFC（Single File Component）で`script` - `template` - `style` の順序に従ってください。**

  ```vue
  <script>/* ... */</script>
  <template>...</template>
  <style>/* ... */</style>
  ```

A7. **常に、詳細なプロップの定義を使用してください。少なくとも`type`を定義してください。**

- Bad:

  ```javascript
  const props = defineProps(['status'])
  ```

- Good:

  ```javascript
  const props = defineProps({
    status: {
      type: String,
      required: true,
      validator: (value) => {
        return ['syncing', 'synced'].includes(value)
      }
    }
  })
  ```

A8. **template内では常にkebab-caseをプロップ名として使用してください。**

  ```javascript
  const props = defineProps({
   greetingText: {
     type: String,
     required: true
   }
  })
  ```

  ```html
  <template>
   <welcome-message greeting-text="hi"></welcome-message>
  </template>
  ```

A9. **いつも`key`を`v-for`に追加してください。**

  ```html
  <ul>
    <li
     v-for="todo in todos"
     :key="todo.id"
    >
      {{ todo.text }}
    </li>
  </ul>
  ```

A10. **`v-for`と一緒に`v-if`を使うのは避けてください。**

- Bad:

  ```html
  <ul>
    <li
      v-for="user in users"
      v-if="user.isActive"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

- Good:

  ```html
  <ul>
    <li
      v-for="user in activeUsers"
      :key="user.id"
    >
      {{ user.name }}
    </li>
  </ul>
  ```

  ```html
  <ul>
    <template v-for="user in users" :key="user.id">
      <li v-if="user.isActive">
        {{ user.name }}
      </li>
    </template>
  </ul>
  ```

A11. **いつもショートハンドディレクティブ「shorthand directive」を使用してください。**

Directive shorthands:

- `:`  for  `v-bind:`
- `@`  for  `v-on:`
- `#`  for  `v-slot`

  ```html
  <input
    :value="newTodoText"
    :placeholder="newTodoInstructions"
    @input="onInput"
    @focus="onFocus"
  />
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
  ```

A12. **`style`内のpropertyには常に`scoped`を使用してください。**

アプリケーションにおいて、トップレベルの App コンポーネントと layout 内の styles はグローバルになる場合がありますが、他のすべての components は常にスコープされるべきです。

  ```html
  <style scoped>
  ...
  </style>
  ```

A13. **常に常に[RSCSS](https://ricostacruz.com/rscss/index.html)に従ってください。**

A14. **常に`~`を使用して`rootDir`にアクセスしてください。**

## [SHOULD / RECOMMENDED]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

S1. **Componentの定義の順序に従うべきです。**

- `definePageMeta()` *(Nuxt)*
- `defineProps()`
- `defineEmits()`
- Composables
- `onBeforeRouteUpdate()` *(Nuxt)*
- `onBeforeRouteLeave()` *(Nuxt)*
- `onBeforeMount()`
- `onMounted()`
- `onBeforeUpdate()`
- `onUpdated()`
- `onActivated()`
- `onDeactivated()`
- `onBeforeUnmount()`
- `onUnmounted()`
- `onErrorCaptured()`
- `onRenderTracked()`
- `onRenderTriggered()`
- `useHead()` *(Nuxt)*
- function compose

S2. **属性の順序に従うべきです。**

要素（including components）の属性は一貫して順序付けるべきです。

- 定義
  - `is`

- リストのレンダリング
  - `v-for`

- 条件分岐
  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

- レンダーモディファイアー
  - `v-pre`
  - `v-once`

- グローバル意識
  - `id`

- ユニークな特徴
  - `ref`
  - `key`

- 双方向バインディング
  - `v-model`

- 他の属性

- イベント
  - `v-on`

- コンテンツ
  - `v-html`
  - `v-text`

:point_right: *要素の属性は、次の順序に従うべきです：Directive > Static props > Dynamic props > Event*

- Example:

  ```vue
    <component-a
      v-if="filter"
      color="primary"
      class="class-name"
      :closeable="!required"
      :editable="true"
      :highlighted="filter.required"
      @click="doSomething"
    />
  ```

S3. ***空行*を使用するべきです。**

コードの論理的なブロックを視覚的に区別するために、空行を使用してください。
いくつかのケース:

- 他の部分とimportエリアを分けてください
- 他のエリアとpropsエリアを分けてください
- 他のpropsとは別に*multiple lines*のpropを分けてください
- 他のエリアとemitsエリアを分けてください
- 論理的なブロック間を分けてください
- `return`の後に論理構文を配置してください

  ```vue
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import useAStore from '~/stores/store-a';
  // Separate import area with the rest
  const aStore = useAStore()
  // Separate props area with others
  const props = defineProps({
    propA: {
      type: Number,
      required: true
    },
    // Separate `multiple lines prop` with other props
    propB: String,
    propC: Boolean,
  })
  // Separate emits area with others
  const emit = defineEmits(['update:something'])
  // Separate out between logical blocks
  const variableA = ref<string>('value A')
  watch(variableA, newA => {
    emit('update:something', newA)
  })
  function doSomethingForA(paramX) {
    const condition = checkValidSomething(paramX)
    if (!condition) {
      return false
    }
    // After `return` logic syntax
    const res = aStore.handleSomething(paramX)
    showNotification('...something')
  }
  // Separate out between logical blocks
  const variableB = ref('value B')
  function doSomethingForB(paramY) {
    ...
  }
  // Separate out between logical blocks
  function checkValidSomething(param) {
    const isValid = true
    // Before `return` logic syntax
    return isValid
  }
  </script>
  ```

S4. **`template`内での表現は避けるべきです。**

Component templates には、単純な式のみを含めるべきであり、より複雑な式はcomputedプロパティやmethodsにリファクタリングするべきです。

- Bad:

  ```javascript
  <p>
    {{
      fullName.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
    }}
  </p>
  ```

- Good:

  ```vue
  <script setup>
  const normalizedFullName = computed(() =>
    fullName.value
      .split(' ')
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(' '))
   </script>
  ```

  ```html
  <p class="name">{{ normalizedFullName }}</p>
  ```

S5. **SHOULD prefer style over utility class**

- Bad:

  ```html
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      .....
    </div>
  </div>
  ```

- Good:

  ```html
  <div class="detail-info">
    <div class="area -parking">
    </div>
    <ul class="area -spaces">
      <li class="space"></li>
    </ul>
  </div>
  ```
