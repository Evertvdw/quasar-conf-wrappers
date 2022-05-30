<template>
  <q-input
    @update:model-value="$emit('update:model-value', $event)"
    :model-value="modelValue"
    class="qsr-input"
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
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (event: 'update:model-value', value: string | number | null): void;
}>();
</script>

<style lang="scss">
.qsr-input {
  .q-field__label {
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      font-size 150ms cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1;
    background-color: white;
    padding-left: 6px;
    padding-right: 6px;
    margin-left: -6px;
  }

  &.q-field--float {
    .q-field__label {
      transform: translateY(-138%);
      font-size: 12px;
    }
  }

  .q-field__native {
    padding-top: 8px;
    font-size: 16px;
  }
}
</style>
