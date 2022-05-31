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
        stack-label
        lazy-rules
        hide-bottom-space
        no-error-icon
      />
      <q-input
        v-model="form.favorite_food"
        label="Favorite food"
        outlined
        stack-label
        lazy-rules
        hide-bottom-space
        no-error-icon
      />
      <q-btn type="submit" color="primary" label="Submit" />
    </q-form>
    <q-form class="q-gutter-md" style="width: 300px">
      <h4 class="q-mb-md">Better form</h4>
      <qsr-input
        v-model="form2.name"
        label="Name"
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
      <qsr-input v-model="form2.hobbies" label="Hobbies" />
      <qsr-input v-model="form2.favorite_food" label="Favorite food" />
      <q-btn type="submit" color="primary" label="Submit" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import QsrInput from 'src/components/QsrInput.vue';

const form = reactive({
  name: '',
  profession: '',
  hobbies: '',
  favorite_food: '',
});

const form2 = reactive({
  name: '',
  profession: '',
  hobbies: '',
  favorite_food: '',
});
</script>
