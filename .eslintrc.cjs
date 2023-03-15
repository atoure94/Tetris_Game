module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'standard',
        'plugin:prettier/recommended',
    ],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'react/jsx-max-props-per-line': [1, { when: 'always' }],
        'react/jsx-indent-props': [2, 2],
        // 'comma-dangle': [
        //   'error',
        //   {
        //     arrays: 'only-multiline',
        //     objects: 'always',
        //     imports: 'never',
        //     exports: 'never',
        //     functions: 'never',
        //   },
        // ],
        semi: ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'react/react-in-jsx-scope': 0,

        'prettier/prettier': ['error', { endOfLine: 'off' }],
    },
};
