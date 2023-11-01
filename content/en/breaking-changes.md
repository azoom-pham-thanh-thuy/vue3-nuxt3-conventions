---
title: 'Breaking changes'
description: 'Breaking changes'
---

## [Breaking Changes]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

**B1. CompositionAPI:**

- Optional API (old style)

  ```vue
  <template>
    <h1>{{ counter }}</h1>
    <button @click="incrCounter">Click Me</button>
  </template>
  <script>
  export default {
    data() {
      return {
        counter: 0,
      }
    },
    methods: {
      incrCounter: function () {
        this.counter += 1
      },
    },
  }
  </script>
  ```

- Composition API (new style)

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'

  const counter = ref<number>(0)
  function incrCounter(): void {
    counter.value += 1
  }
  </script>

  <template>
    <h1>{{ counter }}</h1>
    <button @click="incrCounter">Click Me</button>
  </template>
  ```

:point_right: `Big changing` takes long time to get used to: (such as lifecycle hook, writing mindset, ref, reactive,....)

**B2. Some notice changes:**

- B2.1. Defining props needs to use `defineProps()`

  - Use the object syntax:

  ```javascript
  defineProps({
    propA: {
      type: [String, Number],
      required: true,
    },
    propB: {
      type: Number,
      default: 210198,
    },
    propC: {
      type: Object,
      default(rawProps) {
        return { message: 'Hello' }
      },
    },
  })
  ```

  - When using type declaration

  ```javascript
  interface Props {
    msg?: string
    labels?: string[]
  }

  defineProps<Props>()

  /* Default props values */
  withDefaults(defineProps<Props>(), {
    msg: 'hello',
    labels: () => ['one', 'two']
  })
  ```

- B2.2. Declaring events emit

  ```html
  // Vue 2
  <button @click="$emit('change', 100)">Change</button>

  // Vue 3
  <script setup lang="ts">
    // type-based
    const emit = defineEmits<{ (e: 'change', id: number): void }>()

    // 3.3+: alternative, more succinct syntax
    const emit = defineEmits<{ change: [id: number] }>()
  </script>
  <template>
    <button @click="emit('change', 100)">Change</button>
  </template>
  ```

- B2.3. Changing hooks name:

  - `destroyed` => `unmounted`
  - `beforeDestroy` => `beforeUnmount`

- B2.4. **v-if** has more priorities than **v-for** if being used on an element (In Vue 2, **v-for** > **v-if**)

- B2.5. Changings about **v-model**

  - Remove `.sync` and replace by binding of `v-model`

  ```html
  // Vue 2
  <ChildComponent :title.sync="pageTitle" />

  // Vue 3
  <ChildComponent v-model:title="pageTitle" />
  ```

  - Multiple v-model

  ```html
  // Vue 2
  <ChildComponent
    :title="pageTitle"
    @update:title="pageTitle = $event"
    :content="pageContent"
    @update:content="pageContent = $event"
  />

  // Vue 3
  <ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />
  ```

- B2.6. The order of writing the bindings will affect the outcome  (the last writing will take effect)
  ```html
  <p id="x" v-bind="{ id: 'y' }">// Vue 2: id="x", Vue 3: id="y"</p>
  ```

**B3. Proxy and Reactivity in depth**

```js
// Vue 2
<div>{{ comps }}</div> // []
data() {
  return {
    comps: []
  }
},
mounted() {
  this.comps[0] = 'Azoom'
}
```

- With the Vue 2 mechanism using `Object.defineProperty` to catch property change event, and it only works when Vue.set is still active (the component is created) -> If you update an array, object property when component being mounted will not detect the changes (watch deep is a clearly example). As shown in the example, it will result in a completely empty screen.

  ```js
  // Giải pháp ở Vue 2 là:
  this.$forceUpdate()
  // hoặc
  Vue.set(this.comps, 0, 'Azoom')

  => <div>{{ comps }}</div> // ["Azoom"]
  ```

  :point_right: In vue 3, it uses Proxy. So, the above problem has been solved

  ```vue
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'

  const comps = ref([])

  onMounted(() => {
    comps.value[0] = 'Azoom'
  })
  </script>

  <template>
    <div>{{ comps }}</div> // ["Azoom"]
  </template>
  ```

**B4. Composables: The replacement for mixins can be helpers/utilities**

- In situation that you want to share `stateful logic` or `logic` between Components: format date, format yen, tracking event,...
- Before that, we had tools to solve these problems like mixins, helpers/utils. Nowadays, these tools have some problems:
  - Naming merge: Variables and functions inside mixin are duplicated name with vars and funcs outside Component using them => Vue has had `merge strategy`, but it still be annoying when debugging.
  - Implicit Dependency: Mixins and the components using them do not have a hierarchical relationship, which means that components can access any property within mixins and vice versa => Be careful when refactoring Component and modifying variables within mixins.
  - For more examples([More](https://azoom.slack.com/archives/GV1L7LQJW/p1671437071682909)).  
  :point_right: Therefore, Composables are created to handle with these lingering issues.

  ```vue
  <script setup>
  import { useFeatureA } from './featureA.js'
  import { useFeatureB } from './featureB.js'
  import { useFeatureC } from './featureC.js'

  const { foo, bar } = useFeatureA()  
  const { baz } = useFeatureB(foo)  
  const { qux } = useFeatureC(baz) 
  </script>
  ```

- Solved problems compared to Mixins:
  - Clear import sources (from which Composable) as opposed to importing everything with the old Mixin style.
  - Easily rename conflicting variables/functions upon import.
  - No more implicit dependencies => variables are passed more explicitly into Composables.
  - Provide a readonly option to prevent changes to variables within the Composable.

**B5. Teleport: "Teleport" desired element in Component to outside**

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

- The content of "to" will be a CSS selector or `a node in the DOM tree`. In the above example, it is currently being appended to the "body" element.
  :point_right: Can be useful with popup, dialog, tooltip,...

**B6. CSS Features**

- Deep Selectors

  ```vue
  <style scoped>
  /* Vue 2 */
  ::v-deep .child-class { }

  /* Vue 3 */
  :deep(.child-class) { }
  </style>
  ```

- `v-bind()` in CSS
  ```html
  <script setup>
    const theme = { color: 'red' }
  </script>
  <template>
    <p>hello</p>
  </template>
  <style scoped>
    p {
      color: v-bind('theme.color');
    }
  </style>
  ```

- Slotted Selectors
  ```vue
  <style scoped>
  :slotted(div) {
    color: red;
  }
  </style>
  ```
- Global Selectors
  ```vue
  <style scoped>
  :global(.red) {
    color: red;
  }
  </style>
  ```
- CSS Modules
  ```vue
  <template>
    <p :class="$style.red">This should be red</p>
  </template>

  <style module>
  .red {
    color: red;
  }
  </style>
  ```

**B7. Support Typescript more smoothly**
