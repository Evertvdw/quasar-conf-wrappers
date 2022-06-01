import { QInputProps } from 'quasar';

export interface _QsrInput extends QInputProps {
  // Additional custom prop
  /**
   * Animation speed of the label moving up
   * @defuault 150ms
   */
  animationSpeed?: string;
}
