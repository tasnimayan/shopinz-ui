module.exports = {
  env: {
    browser: true,
    es2021: true, // Latest ES features
  },
  parserOptions: {
    ecmaVersion: 'latest', // Modern syntax
    sourceType: 'module', // Allow import/export
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  settings: {
    react: {
      version: 'detect', // Auto-detect React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'], // Recognize these file types
      },
    },
  },
  plugins: ['react', 'react-hooks', 'import', 'jsx-a11y'],
  extends: [
    'eslint:recommended', // Core JS rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // Hooks rules
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'plugin:import/errors', // Import errors
    'plugin:import/warnings', // Import warnings
    'plugin:import/react', // Import React-specific
    'prettier', // Disable rules conflicting with Prettier
  ],
  rules: {
    // Import rules (important for Vercel case sensitivity issues)
    'import/no-unresolved': ['error', { caseSensitive: true }],
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',

    // React specific
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Disable if you don't use PropTypes
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',

    // Hooks rules
    'react-hooks/rules-of-hooks': 'error', // Checks rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect deps

    // General JS rules
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 'no-console': 'warn',
    'no-debugger': 'error',

    'import/no-named-as-default': 'off',
    'import/no-duplicates': 'error',
    'import/no-named-as-default-member': 'off',
    'import/no-cycle': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/export': 'error',
    'import/no-useless-path-segments': 'error',
    'import/extensions': 'off',
  },
};
