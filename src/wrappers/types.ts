import { QInputProps } from 'quasar';

// We have to define our extended interface here so we can import it in `wrappers.d.ts` to define our global component
export interface _QsrInput extends QInputProps {
  // Additional custom prop
  /**
   * Animation speed of the label moving up
   * @defuault 150ms
   */
  animationSpeed?: string;
}
