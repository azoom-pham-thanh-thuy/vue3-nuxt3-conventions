---
title: 'Breaking changes'
description: 'Breaking changes'
---

## [Breaking Changes]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

**B1. CompositionAPI:**

- Optional API (こふう)

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

- Composition API (しんぷう)

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

:point_right: `Big changing` 慣れるのに時間がかかります: (例えばライフサイクルフック、ライティングマインドセット、リファレンス、リアクティブなど)。

**B2. 一部の通知の変更点:**

- B2.1. props の定義には `defineProps()` を使用する必要があります。

  - オブジェクト構文を使用してください:

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

  - 型宣言を使用する際

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

- B2.3. hooks 名を変更する:

  - `destroyed` => `unmounted`
  - `beforeDestroy` => `beforeUnmount`

- B2.4. **v-if**は、要素に使用される場合には**v-for**よりも優先度が高いです。(In Vue 2, **v-for** > **v-if**)

- B2.5. 変更に関して **v-model**

  - `sync`を削除し、`v-model`のバインディングに置き換える。

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

- B2.6. **binding**の書き順は結果に影響します（最後に書かれたものが適用されます）

  ```html
  <p id="x" v-bind="{ id: 'y' }">// Vue 2: id="x", Vue 3: id="y"</p>
  ```

**B3. Proxy and Reactivity in depth:**

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

- Vue 2の仕組みでは、`Object.defineProperty`を使用してプロパティ変更イベントをキャッチしますが、これはVue.setがアクティブである限り（componentが作成されている状態）、のみ機能します。➡️ 配列やオブジェクトのプロパティを更新しても、mounted状態のコンポーネントでは変更が検知されません（watch deepは明らかな例です）。例の通り、完全に空の画面になってしまいます。

  ```js
  // Giải pháp ở Vue 2 là:
  this.$forceUpdate()
  // hoặc
  Vue.set(this.comps, 0, 'Azoom')

  => <div>{{ comps }}</div> // ["Azoom"]
  ```

  :point_right: Vue 3ではProxyが使用されています。そのため、上記の問題は解決されています。

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

**B4. Composables: mixins の代替手段として、helpers/utilities を使うことができます:**

- コンポーネント間で`stateful logic`や`logic`を共有したい場合のシチュエーションですね。Components: format date, format yen, tracking event,...
- その前は、mixinsやhelpers/utilsなどのツールを使ってこれらの問題を解決していました。しかし、現在ではこれらのツールにいくつかの問題があります:
  - Naming merge: mixin 内の変数や関数は、それらを使用している Component の外部の変数や関数と重複した名前になります => Vue には `merge strategy` がありますが、デバッグ時には依然として迷惑です。
  - Implicit Dependency: Mixins とそれらを使用している components には階層関係がないため、コンポーネントは mixins 内の任意のプロパティにアクセスしたり、その逆も可能です => Component をリファクタリングし、mixins 内の変数を変更する際は注意してください。
  - For more examples([More](https://azoom.slack.com/archives/GV1L7LQJW/p1671437071682909)).  
  :point_right: したがって、これらの問題を解決するために Composables が作成されました。

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

- Mixinsに比べて解決された問題と比較して、以下のような問題が解決されました:
  - 古いMixinスタイルで全てをインポートするのとは対照的に、クリアなインポートソース（Composableから）が可能になりました。
  - インポート時に簡単に競合している変数や関数の名前を変更できます。
  - もはや暗黙の依存関係はありません => 変数はより明示的に Composable に渡されます。
  - Composable 内の変数の変更を防ぐために、読み取り専用オプションを提供してください。

**B5. Teleport: コンポーネント内の`Teleport`したい要素を外部に移動します:**

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

- 「to」の内容はCSSセレクタまたは`DOMツリーのノード`になります。上記の例では、「body」要素に現在追加されています。
  :point_right: `popup`, `dialog`, `tooltip`,...と一緒に使えます。

**B6. CSS Features:**

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

**B7. Support Typescript more smoothly:**
