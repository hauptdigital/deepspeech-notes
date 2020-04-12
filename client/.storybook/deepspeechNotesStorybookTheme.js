import { create } from '@storybook/theming/create';
import theme from '../src/theme';

export default create({
  base: 'light',

  // UI
  appContentBg: theme.colors.background,

  // Typography
  fontBase: '"MontSerrat", sans-serif',

  brandTitle: 'Deepspeech notes Storybook',
  brandUrl: 'https://github.com/hauptdigital/deepspeech-notes',
  brandImage: 'https://placehold.it/350x150',
});
