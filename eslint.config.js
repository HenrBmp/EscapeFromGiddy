import css from '@eslint/css';
import js from '@eslint/js';
import json from '@eslint/json';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs}'],
        plugins: { js },
        extends: ['js/recommended'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } },
    },
    {
        files: ['**/*.json'],
        plugins: { json },
        language: 'json/json',
        extends: ['json/recommended'],
    },
    { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            indent: ['error', 4],
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            'no-unused-vars': ['error'],
            'no-console': 'off',
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
            'no-multi-spaces': 'error',
            'arrow-spacing': ['error', { before: true, after: true }],
            'import/no-unresolved': 'error',
            'import/named': 'error',
            'import/default': 'error',
        },
    },
    { extends: ['prettier'] },
]);
