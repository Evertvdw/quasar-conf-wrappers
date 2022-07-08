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

<!--
- Going to show how you can wrap and extend Quasar components

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

<!--
- Some quasar components will have a lot of properties setup

-->

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

<!--
- Qsr is a made-up abbreviation of a company name

-->

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

But what can we do? There are two main ways of doing this that I will highlight and compare.

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

<!--
- Both options have a lot of things in common, first I will show the parts that are the same for both options.

-->

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

```vue {3,11,14}
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

<!--

- Composition API variant should be easy do adopt from this.
- I have not tried options API or javascript

-->

---

# Using Quasar component methods - 2
How does that work?

When using a wrapper the parent component looks similar

```vue {3,11,12,15}
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

```vue {3,11,13-16}
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

```vue {2,5-11|4,5}
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

<!--
- Passing the imported interface directly will throw errors in Vue
- Empty interfaces might trigger eslint rules
 -->

---

# Typed properties, slots & emits
Kind of overlapping with the previous point

<div v-click>

We already saw property typing, and emits are also typed automatically when extending `QInputProps`.

<img src="/emit-typed.gif" class="h-30" />

</div>

<div v-click>

Slots with `QInput` have autocomplete and documentation, as well as typed slot parameters 🤯

<img  src="/slot-hint.png" class="h-30" />

</div>

<!--
- Credits to Yusuf!
- Slots can be typed using Volar
- 14000 lines of types in `index.d.ts` in Quasar
-->

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
yarn add -D unplugin-vue-components
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

<!--
- This will auto-import all Vue components throughout your app
- Bonus tip: unplugin-auto-import to also import things like `ref` and `computed`
 -->

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

<!--
- Full example is available at the demo repository
 -->

---

# Wrapping up
Yes, pun intended

<div v-click>

## Which one to choose?
<img class="inline w-60 my-5" src="https://media.giphy.com/media/kGcrwfW60dya2RqaaW/giphy.gif" />

</div>

<div v-click>

## Can I have the code?
Yes of course! The slides are also in this repository. The main branch contains *Option 1*, and there is a separate branch for *Option 2*

> https://github.com/Evertvdw/quasar-conf-wrappers

</div>


---

# Bonus - Extending Quasar components
Extra goodies! 🤗

There is an example the repository of an Material Design styled QInput field, where you can control the animation speed of the label 😎

<img src="/extended-component.gif" class="w-50" />

---

# Bonus - Extending Quasar components - 2
What does that look like?

<div grid="~ cols-3 gap-2">

<div>

```html
<template>
  <q-input
    ref="inputRef"
    @update:model-value="$emit('update:model-value', $event)"
    :model-value="modelValue"
    class="qsr-input"
    outlined
    no-error-icon
    lazy-rules
    hide-bottom-space
  >
    <template
      v-for="(_, slot) in $slots"
      v-slot:[slot]="scope"
    >
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </q-input>
</template>
```
</div>

<div>

```ts
<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';

interface QsrInput extends QInputProps {
  modelValue: QInputProps['modelValue'];

  /**
   * Animation speed of the label moving up
   * @defuault 150ms
   */
  animationSpeed?: string;
}

withDefaults(defineProps<QsrInput>(), {
  animationSpeed: '150ms',
});

const inputRef = ref<QInput | null>(null);

defineEmits(['update:model-value']);

defineExpose({
  input: inputRef,
});
</script>
```
</div>

<div>

```scss
<style lang="scss">
.qsr-input {
  .q-field__label {
    transition: transform v-bind('animationSpeed') cubic-bezier(0.4, 0, 0.2, 1),
      font-size v-bind('animationSpeed') cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    background-color: white;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: -6px;
  }

  &.q-field--float {
    .q-field__label {
      transform: translateY(-136%);
      font-size: 12px;
    }
  }

  .q-field__native {
    padding-top: 8px;
    font-size: 16px;
  }
}
</style>

```

</div>

</div>

<style>
.slidev-code {
  --slidev-code-line-height: 16px;
  --slidev-code-font-size: 10px;
}
</style>


---
layout: center
class: 'text-center pb-5'
---

# Thank You!

Slides & code can be found on [github.com/Evertvdw/quasar-conf-wrappers](https://github.com/Evertvdw/quasar-conf-wrappers)

<div class="mt-15">

Slides made with <img class="inline w-25" src="/logo-title-horizontal.png"/>

</div>
