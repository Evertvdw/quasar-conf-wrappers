import { boot } from 'quasar/wrappers';
import QsrInput from 'src/wrappers/QsrInput.vue';

// This boot file will need to be extended for every extra wrapper that is defined
export default boot(async ({ app }) => {
  app.component('QsrInput', QsrInput);
});
