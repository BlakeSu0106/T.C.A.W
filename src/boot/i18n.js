import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import zh from '../i18n/zh-TW.json';
import cn from '../i18n/zh-CN.json';

export default boot(({ app }) => {
  const i18n = createI18n({
    legacy: false,
    locale: navigator.language || 'zh-TW',
    globalInjection: true,
    fallbackLocale: 'zh-TW',
    messages: {
      'zh-TW': zh,
      'zh-CN': cn,
    },
  });

  // Set i18n instance on app
  app.use(i18n);
});
