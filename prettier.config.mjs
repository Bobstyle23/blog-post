export default {
  plugins: ['prettier-plugin-astro', 'prettier-plugin-tailwindcss'],

  semi: true,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'lf',

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
