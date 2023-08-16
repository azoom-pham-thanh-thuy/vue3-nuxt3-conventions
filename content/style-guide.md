---
title: 'Style Guide'

description: 'Vue 3 - Nuxt 3 Style Guide'
---


## [MUST / ALWAYS]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}
A1. **ALWAYS put base/generic components inside [az]{.text-red-500} folder, or add prefix [az]{.text-red-500} if not using Nuxt**

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

A2. **ALWAYS use multiword component name, with kebab-case, both in template and file name**

  ```bash
  components/
  -| todo-item.vue
  -| az-input.vue
  ```

  ```html
  <todo-item />
  <az-input></az-input>
  ```

A3. **ALWAYS order word from highest level to lower level**

Component names should start with the highest-level (often most general) words and end with descriptive modifying words.

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

A4. **ALWAYS use full-word component names**

Component names should prefer full words over abbreviations.   
The autocompletion in editors make the cost of writing longer names very low, while the clarity they provide is invaluable. Uncommon abbreviations, in particular, should always be avoided.

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

A5. **ALWAYS put page component in component page folder**

  ```bash
  components/
  -| rooms/
  --| page-component.vue

  pages/
  -| rooms/
  --| index.vue
  ```

A6. **ALWAYS follow `script` - `template` - `style` in SFC**

  ```vue
  <script>/* ... */</script>
  <template>...</template>
  <style>/* ... */</style>
  ```

A7. **ALWAYS use detail prop definition, at least define a `type`**

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

A8. **ALWAYS use kebab-case for prop name in template**

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

A9. **ALWAYS add `key` in `v-for`**

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

A10. **ALWAYS avoid using `v-if` with `v-for`**

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

A11. **ALWAYS use shorthand directive**

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

A12. **ALWAYS use `scoped` style**

For applications, styles in a top-level `App` component and in layout components may be global, but all other components should always be scoped.

  ```html
  <style scoped>
  ...
  </style>
  ```

A13. **ALWAYS follow [RSCSS](https://ricostacruz.com/rscss/index.html)**

A14. **ALWAYS use `~` alias to access `rootDir`** 


## [SHOULD / RECOMMENDED]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

S1. **SHOULD follow component definition order**
-  `definePageMeta()` *(Nuxt)*
-  `defineProps()`
-  `defineEmits()`
-  Composables
-  `onBeforeRouteUpdate()` *(Nuxt)*
-  `onBeforeRouteLeave()` *(Nuxt)*
-  `onBeforeMount()`
-  `onMounted()`
-  `onBeforeUpdate()`
-  `onUpdated()`
-  `onActivated()`
-  `onDeactivated()`
-  `onBeforeUnmount()`
-  `onUnmounted()`
-  `onErrorCaptured()`
-  `onRenderTracked()`
-  `onRenderTriggered()`
-  `useHead()` *(Nuxt)*
- function compose


S2. **SHOULD follow attribute order**

The attributes of elements (including components) should be ordered consistently.

- Definition
  - `is`

- List Rendering
  - `v-for`

- Conditionals
  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

- Render Modifiers
  - `v-pre`
  - `v-once`

- Global Awareness
  - `id`

- Unique Attributes
  - `ref`
  - `key`

- Two-Way Binding
  - `v-model`

- Other Attributes

- Events
  - `v-on`

- Content
  - `v-html`
  - `v-text`

:point_right: *Attributes of an element should following this order: Directive > Static props > Dynamic props > Event*
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

S3. **SHOULD use *blank line***

Use blank line help visually separate out logical blocks of code.
Some cases:
- Separate import area with the rest
- Separate props area with others
- Separate *multiple lines* prop with other props
- Separate emits area with others
- Separate out between logical blocks
- After `return` logic syntax

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

S4. **SHOULD avoid expression in template**

Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.

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
