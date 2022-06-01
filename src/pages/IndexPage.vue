<template>
  <q-page class="row items-center justify-evenly">
    <q-form class="q-gutter-md" style="width: 300px">
      <h4 class="q-mb-md">Awesome form</h4>
      <q-input
        v-model="form.name"
        label="Name"
        outlined
        no-error-icon
        lazy-rules
        hide-bottom-space
        :rules="[
          (val) => !!val || 'Name is required',
          (val) => val.length > 3 || `We don't like short names`,
        ]"
      />
      <q-input
        v-model="form.profession"
        label="Profession"
        outlined
        lazy-rules
        hide-bottom-space
        no-error-icon
        :rules="[(val) => !!val || 'Profession is required']"
      />
      <q-input
        v-model="form.hobbies"
        label="Hobbies"
        outlined
        lazy-rules
        hide-bottom-space
        no-error-icon
        ref="formHobbies"
      />
      <q-input
        v-model="form.favorite_food"
        label="Favorite food"
        outlined
        lazy-rules
        hide-bottom-space
        no-error-icon
      >
        <template #prepend>
          <q-icon name="local_pizza" />
        </template>
      </q-input>
      <q-btn type="submit" color="primary" label="Submit" />
      <q-btn color="primary" outline label="Focus hobbies" @click="onClick" />
    </q-form>
    <q-form class="q-gutter-md" style="width: 300px">
      <h4 class="q-mb-md">Better form</h4>
      <qsr-input
        v-model="form2.name"
        label="Name"
        animation-speed="500ms"
        :rules="[
          (val) => !!val || 'Name is required',
          (val) => val.length > 3 || `We don't like short names`,
        ]"
      />
      <qsr-input
        v-model="form2.profession"
        label="Profession"
        :rules="[(val) => !!val || 'Profession is required']"
        :no-error-icon="false"
      />
      <qsr-input v-model="form2.hobbies" label="Hobbies" ref="form2Hobbies" />
      <qsr-input v-model="form2.favorite_food" label="Favorite food">
        <template #prepend>
          <q-icon name="local_pizza" />
        </template>
      </qsr-input>
      <q-btn type="submit" color="primary" label="Submit" />
      <q-btn color="primary" outline label="Focus hobbies" @click="onClick2" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { QInput } from 'quasar';

const form = reactive({
  name: '',
  profession: '',
  hobbies: '',
  favorite_food: '',
});
const formHobbies = ref<QInput | null>(null);
function onClick() {
  formHobbies?.value?.focus();
}

const form2 = reactive({
  name: '',
  profession: '',
  hobbies: '',
  favorite_food: '',
});
// Notice we get an object here which is equal to the defineExpose we set inside QsrInput
// So the key name 'input' is something we define ourselves
const form2Hobbies = ref<{ input: QInput } | null>(null);
function onClick2() {
  form2Hobbies?.value?.input.focus();
}
</script>
