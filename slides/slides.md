---
# try also 'default' to start simple
theme: default
class: 'text-center'
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
---

# Wrapping and extending Quasar components

Using TypeScript

<div class="p-8">
   Evert van der Weit
  <img src="/evert.png" class="w-10 ml-5 h-10 rounded-full object-cover inline" />
</div>

<img
  class="absolute bottom-9 right-9 w-50"
  src="https://cdn.quasar.dev/logo-v2/svg/logo-horizontal-dark.svg"
/>

<!--
- Welcome

-->

---

# Wrapping components

What do I mean by that?

<v-click>

Normal Quasar component usage:

</v-click>

<v-click>

```html {all|5-8|all}
<template>
  <q-input
    v-model="form.profession"
    label="Profession"
    outlined
    lazy-rules
    hide-bottom-space
    no-error-icon
    :rules="[(val) => !!val || 'Profession is required']"
  />
</template>
```

</v-click>

---

# Wrapping components - 2

What do I mean by that?

<div grid="~ cols-2 gap-4">
<div>

Wrapped component usage:

```html {all|2}
<template>
  <qsr-input
    v-model="form.profession"
    label="Profession"
    :rules="[(val) => !!val || 'Profession is required']"
  />
</template>
```

</div>

<div v-click>

*QsrInput.vue* content:

```vue
<template>
  <q-input
    outlined
    no-error-icon
    lazy-rules
    hide-bottom-space
  />
</template>
```
</div>

</div>

<v-click>

Extra properties passed to `qsr-input` will be passed down to `q-input` automatically by Vue.

Use the `qsr-input` in your application instead of `q-input`.

</v-click>

---

# Use cases

Why would you want to do this?

<v-clicks>

- 🙌 Set 'default' properties for Quasar components
- ✨ Add general component logic in one place (QTable/QSelect filter functions)
- 🤩 Custom design of components (in `style` blocks)
- 🛠️ Easy refactoring
- 🏗️ Extending component functionality

</v-clicks>

---

# Challenges when wrapping

Of course there are...

<img v-click class="inline w-40" src="https://media2.giphy.com/media/9Y5BbDSkSTiY8/200.webp?cid=ecf05e47wvctsywa9hev86huxm3cipt0mnox74hutdf39azh&rid=200.webp&ct=g" />


<v-click>

Few things to consider:

- Components with slots
- Using Quasar component methods
- Property validation & IDE hints
- Typed properties, slots & emits
- Automagic availability of components

</v-click>

---

# ⚠️ Spoiler alert ⚠️

The perfect solution does not (yet) exist

But what can we do? There are two main ways of doing this that I will highlight and compare

<div grid="~ cols-2 gap-4" class="mb-10">

<div v-click>

*Option 1*

- ✅ Components with slots
- ✅ Using Quasar component methods
- ✅ Property validation & IDE hints
- ☑️ Typed properties, <s>*slots*</s> & emits
- ✅ Automagic availability of components

</div>

<div v-click>

*Option 2*

- ✅ Components with slots
- ✅ Using Quasar component methods
- ✅ Property validation & IDE hints
- ✅ Typed properties, slots & emits
- ☑️ Automagic availability of components

</div>

</div>

<v-click>

The next slides will show exactly how we do this for both options.

</v-click>

---

# Components with slots
Many Quasar components have predefined slots, how does that work?

Slots are not automatically passed down to child components like properties are.

<div v-click>

Inside the wrapper component we can pass down all slots to the `q-input` component like this[^1] :

```html {5-7}
<template>
  <q-input
    -- omitted for clarity --
  >
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </q-input>
</template>
```

This is the same for *Option 1* and *Option 2*

</div>

[^1]: [Copied from a comment in this gist](https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2)

<style>
.footnotes-sep {
  @apply mt-10 opacity-10;
}
</style>
---

# Using Quasar component methods
How does that work?

> The examples shown will use script setup and TypeScript

Normally we would do something like this:

<div>

```vue {all|3,11,14}
<template>
  <q-input
    ref="inputRef"
    -- ommitted for clarity --
  />
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

const inputRef = ref<QInput | null>(null);

function someMethod() {
  inputRef?.value?.focus();  // This will autocomplete and show documentation on hover
}
</script>
```

<style>
.slidev-code {
  --slidev-code-line-height: 16px;
  --slidev-code-font-size: 12px;
}
</style>

</div>

---

# Using Quasar component methods - 2
How does that work?

When using a wrapper the parent component looks similar

```vue {all|3,11,12,15}
<template>
  <qsr-input
    ref="inputRef"
    -- ommitted for clarity --
  />
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

// The key 'input' we define inside our wrapper component
const inputRef = ref<{ input: QInput } | null>(null);

function someMethod() {
  inputRef?.value?.input.focus();  // This will autocomplete and show documentation on hover
}
</script>
```

---

# Using Quasar component methods - 3
How does that work?

By default Vue will not expose methods when using a ref.
Inside `QsrInput.vue` we have to expose it explicitely:

<v-click>

```vue {all|3,11,13-16}
<template>
  <q-input
    ref="inputRef"
    -- ommitted for clarity --
  />
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

const inputRef = ref<QInput | null>(null);

defineExpose({
  // Here we define the key mentioned in the previous slide
  input: inputRef,
});
</script>
```

</v-click>

---

# Property validation & IDE hints
The magic of Volar🪄

When using Volar inside VSCode there are some IDE hints:

<img v-click src="/hover-hint.gif" class="h-30" />

<img v-click src="/error-type.png" class="h-19 mt-5" />

<img v-click src="/type-autocomplete.gif" class="h-30 mt-5" />

---


# Property validation & IDE hints - 2
The magic of Volar🪄

We don't want to lose these features when using wrappers!

Inside `QsrInput.vue` we have to extend QInput properties. [^1]

```vue {all|2,5-11}
<script setup lang="ts">
import { QInputProps } from 'quasar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QsrInput extends QInputProps {
  // Caveat: Every prop used inside this component needs to be defined here like:
  modelValue: QInputProps['modelValue'];
}

// We cannot pass imported interface to defineProps directly [1]
defineProps<QsrInput>()
</script>
```

[^1]: [Github issue](https://github.com/vuejs/core/issues/4294)

<style>
.footnotes-sep {
  @apply mt-8 opacity-10;
}
</style>

---

# Typed properties, slots & emits
Kind of overlapping with the previous point

We already saw property typing, and emits are also typed automatically when extending `QInputProps`.

<img v-click src="/emit-typed.gif" class="h-30" />

Slots are the tough ones though, with `QInput` they have autocomplete and documentation, as well as typed slot parameters 🤯

<img v-click src="/slot-hint.png" class="h-30" />

---

# Automagic availability of components
Where paths will diverge 😢

So far everything is similar for *Option 1* and *Option 2* mentioned earlier.

For this point there are two choices:

<v-clicks>

1. Use a tool to auto-import it when used (like Quasar does internally)
2. Register them globally in your app

</v-clicks>

<div v-click class="mt-8">

#### Pro's ✅ and cons ❌

<div grid="~ cols-2 gap-4">
<div>

*Auto-import*

- ✅ Only import when used
- ✅ Easier to maintain
- ❌ No hints/types on slots

</div>

<div>

*Global components*

- ✅ Slots can have hints/types
- ❌ Extra boilerplate code necessary
- ❌ Unused components are included anyways

</div>

</div>

</div>

---

# Option 1: Auto import
Using unplugin-vue-components

We can add a Vite plugin to auto-import all Vue components used in your app.

```bash
yarn add unplugin-vue-components
```

Inside `quasar.config.js` > build:

```js
vitePlugins: [
  [
    'unplugin-vue-components/vite',
    {
      dts: true,
    },
  ],
]
```

Add the generated .dts file to `tsconfig.json` > `include` field:

```json
"components.d.ts"
```

---


# Option 2: Global components
Register all wrappers globally

To do this, we register a boot file `wrappers.ts`:

```ts
import { boot } from 'quasar/wrappers';
import QsrInput from 'src/wrappers/QsrInput.vue';

// This boot file will need to be extended for every extra wrapper that is defined
export default boot(async ({ app }) => {
  app.component('QsrInput', QsrInput);
});
```

Don't forget to add the boot file inside `quasar.config.js` 🤓

---

# Option 2: Global components - 2
Register all wrappers globally

Define TypeScript definitions for your global components, inside `wrappers.d.ts`

```ts {all|2,6}
import { GlobalComponentConstructor, QInputSlots } from 'quasar';
import { _QsrInput } from './types';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    QsrInput: GlobalComponentConstructor<_QsrInput, QInputSlots>;
  }
}
```

<v-click>

`_QsrInput` needs to extend `QInputProps`, which is imported here and inside `QsrInput.vue` to avoid duplication.

</v-click>


---

# Wrapping up
Yes, pun intended

## Which one to choose?
<img class="inline w-60 my-5" src="https://media.giphy.com/media/kGcrwfW60dya2RqaaW/giphy.gif" />

## Can I have the code?
Yes of course! The slides are also in this repository. The main branch contains *Option 1*, and there is a separate branch for *Option 2*

> https://github.com/Evertvdw/quasar-conf-wrappers


---

# Bonus - Extending Quasar components
Extra goodies! 🤗

There is an example the repository of an Material Design styled QInput field, where you can control the animation speed of the label 😎

<img v-click src="/extended-component.gif" class="w-50" />

---
layout: center
class: 'text-center pb-5'
---

# Thank You!

Slides & code can be found on [github.com/Evertvdw/quasar-conf-wrappers](https://github.com/Evertvdw/quasar-conf-wrappers)
