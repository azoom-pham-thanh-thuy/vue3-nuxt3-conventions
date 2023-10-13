---
title: 'Style Guide'

description: 'Vue 3 - Nuxt 3 Style Guide'
---


## [MUST / ALWAYS]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}
A1. **LUÔN LUÔN đặt các components cơ bản/chung chung bên trong thư mục [az]{.text-red-500}, hoặc thêm tiền tố [az]{.text-red-500} nếu không sử dụng Nuxt**

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

A2. **LUÔN LUÔN đặt tên của component là các từ ghép, với quy tắc kebab-case, trong việc đặt tên template và file**

  ```bash
  components/
  -| todo-item.vue
  -| az-input.vue
  ```

  ```html
  <todo-item />
  <az-input></az-input>
  ```

A3. **LUÔN LUÔN sắp xếp thứ tự từ level cao nhất đến level thấp nhất**

Các tên của component nên bắt đầu với những từ có cấp độ cao nhất (thường là từ có tính chất tổng quan nhất) và kết thúc bằng các từ mô tả cụ thể.

- Không được:

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

- Nên:

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

A4. **LUÔN LUÔN sử dụng tên thành phần bằng từ đầy đủ.**

Tên của các Components nên sử dụng từ đầy đủ hơn là viết tắt.   
Chức năng tự động hoàn thiện trong các trình soạn thảo giúp viết các tên dài nhanh hơn, trong khi độ rõ ràng mà chúng cung cấp không có giá trị. Việc sử dụng viết tắt không phổ biến, đặc biệt là nên luôn bị tránh.

- Không được:
  ```bash
  pages/
  -| users/
  --| u-d-settings.vue
  --| u-prof-opts.vue
  ```

- Nên:
  ```bash
  pages/
  -| users/
  --| user-dashboard-settings.vue
  --| user-profile-options.vue
  ```

A5. **LUÔN LUÔN đặt các component bên trong thư mục có tên tương ứng**

  ```bash
  components/
  -| rooms/
  --| page-component.vue

  pages/
  -| rooms/
  --| index.vue
  ```

A6. **LUÔN LUÔN tuân thủ theo `script` - `template` - `style` trong SFC**

  ```vue
  <script>/* ... */</script>
  <template>...</template>
  <style>/* ... */</style>
  ```

A7. **LUÔN LUÔN sử dụng định nghĩa props chi tiết, ít nhất là xác định một kiểu dữ liệu (type).**

- Không được:

  ```javascript
  const props = defineProps(['status'])
  ```

- Nên:

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

A8. **LUÔN LUÔN sử dụng kebab-case cho tên prop trong template**

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

A9. **LUÔN LUÔN thêm `key` trong `v-for`**

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

A10. **LUÔN LUÔN tránh sử dụng `v-if` cùng với `v-for`**

- Không được:

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

- Nên:

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

A11. **LUÔN LUÔN sử dụng chỉ thị viết tắt (shorthand directive)**

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

A12. **LUÔN LUÔN sử dụng `scoped` trong thẻ style**

Trong một project, style của App Component hoặc layout là có thể viết toàn cục, còn lại tất cả các thành phần khác luôn phải được giới hạn phạm vi (scoped).

  ```html
  <style scoped>
  ...
  </style>
  ```

A13. **LUÔN LUÔN tuân theo [RSCSS](https://ricostacruz.com/rscss/index.html)**

A14. **LUÔN LUÔN sử dụng `~` thay thế để truy cập `rootDir`** 


## [NÊN / KHUYẾN KHÍCH]{.px-2 .py-1 .no-underline .bg-blue-200 .rounded-lg}

S1. **NÊN tuân theo thứ tự định nghĩa component như sau**
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


S2. **NÊN tuân theo thứ tự thuộc tính như sau**

Các thuộc tính của các thành phần (bao gồm các components) nên được sắp xếp một cách đồng nhất.

- Định nghĩa
  - `is`

- Hiển thị danh sách
  - `v-for`

- Các câu lệnh điều kiện
  - `v-if`
  - `v-else-if`
  - `v-else`
  - `v-show`
  - `v-cloak`

- Biến thể hiển thị
  - `v-pre`
  - `v-once`

- Nhận thức tổng quan
  - `id`

- Thuộc tính đặc biệt
  - `ref`
  - `key`

- Ràng buộc 2 chiều
  - `v-model`

- Các thuộc tính khác

- Các sự kiện
  - `v-on`

- Nội dung
  - `v-html`
  - `v-text`

:point_right: *Các thuộc tính của một phần tử nên tuân theo thứ tự sau: Directive > Static props > Dynamic props > Event*
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

S3. **NÊN sử dụng *cách dòng***

Việc sử dụng khoảng trống sẽ ngăn cách logic code với nhau.
Một số trường hợp:
- Phân tách phần import với phần còn lại
- Phân tách phần props với các phần khác.
- Phân tách prop "có nhiều dòng" với các props khác.
- Phân tách phần emits với các phần khác.
- Phân tách giữa các khối logic.
- Sau cú pháp "return".

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

S4. **NÊN tránh biểu thức/logic trong template**

Template của các components chỉ nên bao gồm các biểu thức đơn giản, với các biểu thức phức tạp hơn nên được viết lại thành computed hoặc methods/function.

- Không được:

  ```javascript
  <p>
    {{
      fullName.split(' ').map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
    }}
  </p>
  ```

- Nên:

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

S5. **NÊN viết style ưu tiên hơn là sử dụng các utility class**

- Không được:
  ```html
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      .....
    </div>
  </div>
  ```
- Nên:
  ```html
  <div class="detail-info">
    <div class="area -parking">
    </div>
    <ul class="area -spaces">
      <li class="space"></li>
    </ul>
  </div>
  ```
