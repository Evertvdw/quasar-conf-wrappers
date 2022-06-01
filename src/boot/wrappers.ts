import { boot } from 'quasar/wrappers';
import QsrInput from 'src/wrappers/QsrInput.vue';

export default boot(async ({ app }) => {
  app.component('QsrInput', QsrInput);
});
