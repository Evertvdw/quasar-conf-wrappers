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
    <!-- omitted for clarity -->
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

.footnotes {
  @apply text-sm opacity-75;
}

.footnote-backref {
  display: none;
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
    <!-- ommitted for clarity  -->
  />
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

const inputRef = ref<QInput | null>(null);

function someMethod() {
  formHobbies?.value?.focus();  // This will autocomplete and show documentation on hover
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
