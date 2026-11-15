import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', '.astro/**', '.wrangler/**', 'qa/captures/**', 'test-results/**'] },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    rules: {
      'no-console': 'off',
      'no-debugger': 'error',
      'no-duplicate-imports': 'error',
    },
  },
];
