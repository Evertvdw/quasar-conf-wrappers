<template>
  <q-input
    @update:model-value="$emit('update:model-value', $event)"
    :model-value="modelValue"
    class="qsr-input"
    outlined
    no-error-icon
    lazy-rules
    hide-bottom-space
  />
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';

// Cannot directly pass imported interface to defineProps
// see https://github.com/vuejs/core/issues/4294
// There is a plugin to use in the meantime: https://github.com/wheatjs/vite-plugin-vue-type-imports
// Or declare your own interface and extend the imported one as a workaround like below

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QsrInput extends QInputProps {
  // If we do not provide this Vue throws a warning that modelValue is not supplied
  modelValue: QInputProps['modelValue'];
}

defineProps<QsrInput>();

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
