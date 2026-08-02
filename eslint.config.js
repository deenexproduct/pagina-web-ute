import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**', '.vercel/**', 'public/**'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs['jsx-a11y-recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,jsx,astro}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['**/*.tsx', '**/*.jsx'],
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },
  {
    // role="list" on <ul> is intentional in .astro files — fixes Safari stripping
    // list semantics when list-style:none is applied (known WebKit behaviour).
    // The rule is a false positive in this context.
    files: ['**/*.astro'],
    rules: {
      'astro/jsx-a11y/no-redundant-roles': 'off',

      // Las cards de radio del formulario ponen su texto a 3 niveles de
      // anidado (label > span.inner > span.label) para poder maquetar el
      // ícono y el check. La regla solo mira 2 por defecto y las marcaba
      // como labels sin texto. El input además lleva `for`/`id` explícito,
      // así que el nombre accesible es correcto — subimos la profundidad
      // en vez de apagar la regla.
      'astro/jsx-a11y/label-has-associated-control': ['error', { depth: 3 }],
    },
  },
  prettier,
];
