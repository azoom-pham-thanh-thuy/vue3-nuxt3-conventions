---
title: 'Breaking changes'
description: 'Breaking changes'
---

## [Breaking Changes]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

**B1. CompositionAPI:**

- Optional API (kiểu cũ)

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

- Composition API (kiểu mới)

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

:point_right: `Big changing` này mất khá nhiều thời gian để làm quen: (từ lifecycle hook, mindset viết, ref, reactive,....)

**B2. Một số thay đổi cần lưu ý:**

- B2.1. Khai báo prop cần sử dụng `defineProps()`

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

- B2.2. Khai báo các events emit

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

- B2.3. Thay đổi tên hooks:

  - `destroyed` => `unmounted`
  - `beforeDestroy` => `beforeUnmount`

- B2.4. **v-if** có độ ưu tiên cao hơn **v-for** nếu được sử dụng chung trên 1 element (Ở Vue 2 thì **v-for** > **v-if**)

- B2.5. Những thay đổi về **v-model**

  - Bỏ `.sync` và thay bằng biến số của `v-model`

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

- B2.6. Thứ tự viết **binding** sẽ ảnh hưởng đến kết quả (Vue sẽ luôn lấy giá trị của **binding** viết sau)
  ```html
  <p id="x" v-bind="{ id: 'y' }">// Vue 2: id="x", Vue 3: id="y"</p>
  ```

**B3. Proxy và Reactivity in depth**

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

- Với cơ chế Vue 2 sử dụng kiểu `Object.defineProperty` để bắt sự kiện thay đổi thuộc tính, và chỉ xảy ra khi lúc Vue.set còn hoạt động (component được tạo) -> nên nếu mình update mảng (thêm giá trị vào mảng hoặc xoá giá trị khỏi mảng), property của Object lúc mounted thì nó sẽ không phát hiện ra sự thay đổi (watch deep là ví dụ cụ thể). Như ví dụ trên mặc dù trong mảng có giá trị `Azoom` nhưng trên màn hình lại không hiển thị.

  ```js
  // Giải pháp ở Vue 2 là:
  this.$forceUpdate()
  // hoặc
  Vue.set(this.comps, 0, 'Azoom')

  => <div>{{ comps }}</div> // ["Azoom"]
  ```

  :point_right: Ở vue 3 sử dụng Proxy nên câu chuyện trên đã được giải quyết

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

**B4. Composables: Kẻ thay thế mixins có thể là helpers/utils**

- Nó được sinh ra trong trường hợp mà mình muốn chia sẻ các `stateful logic` hoặc `logic` giữa các Component với nhau, vd: format date, format yen, tracking event,...
- Trước đây chúng ta có công cụ để xử lý các vấn đề này như mixins, helpers/utils. Nhưng càng ngày thì các công cụ này càng lộ ra nhiều vấn đề như:
  - Naming merge: Các biến và hàm bên trong mixin bị trùng tên với biến và hàm bên ngoài Component sử dụng nó => Vue đã có `merge strategy` nhưng vẫn sẽ gây khó khăn khi debug
  - Phụ thuộc ngầm: Mixins và component sử dụng nó không có mối quan hệ thứ bậc vì thế mà component có thể sử dụng mọi thuộc tính trong mixins và ngược lại => cẩn trọng khi refactor Component và đổi các biến trong Mixins
  - Ví dụ minh hoạ cụ thể hơn([Xem thêm](https://azoom.slack.com/archives/GV1L7LQJW/p1671437071682909)).  
  :point_right: Vì thế Composables được sinh ra để xử lý các vấn đề còn tồn đọng này

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

- Các vấn đề được khắc phục so với Mixins:
  - Có nguồn import rõ ràng(từ Composable nào) khác với import tất cả với Mixins kiểu cũ
  - Dễ dàng để đổi tên biến/hàm bị trùng khi import
  - Không còn phụ thuộc ngầm nữa => các biến được truyền rõ ràng hơn vào các Composable
  - Cung cấp option readonly ngăn chặn thay đổi các biến trong Composable

**B5. Teleport: "Dịch chuyển" element mong muốn trong Component ra phạm vi bên ngoài**

```html
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

- Nội dung của to sẽ là `CSS selector` hoặc `một thẻ trong DOM tree`. Trong ví dụ trên thì đang append vào thẻ body  
  :point_right: Hữu ích khi chơi với mấy anh popup, dialog, tooltip,...

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

**B7. Hỗ trợ Typescript mượt mà hơn**
