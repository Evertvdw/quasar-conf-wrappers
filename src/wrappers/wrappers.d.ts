import { GlobalComponentConstructor, QInputSlots } from 'quasar';
import { _QsrInput } from './types';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    QsrInput: GlobalComponentConstructor<_QsrInput, QInputSlots>;
  }
}
