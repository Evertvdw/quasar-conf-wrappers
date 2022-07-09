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
    <template v-for="(_, slot) in $slots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope || {}" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';

// Cannot directly pass imported interface to defineProps
// see https://github.com/vuejs/core/issues/4294
// Declare your own interface and extend the imported one as a workaround like below

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface QsrInput extends QInputProps {
  // If we do not provide this Vue throws a warning that modelValue is not supplied and the props will not work
  // Every prop explicitely used inside this component needs to be defined here like below
  modelValue: QInputProps['modelValue'];

  // Additional custom prop
  /**
   * Animation speed of the label moving up
   * @default 150ms
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
