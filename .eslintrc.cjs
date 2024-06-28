module.exports = {
  ignorePatterns: ['.server', '.public', 'src/__fixtures__', 'coverage'],
  overrides: [
    {
      extends: [
        'standard',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:jsdoc/recommended-typescript-flavor',
        'plugin:n/recommended',
        'plugin:promise/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'prettier'
      ],
      env: {
        browser: false
      },
      files: ['**/*.{cjs,js}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname
      },
      plugins: [
        '@typescript-eslint',
        'import',
        'jsdoc',
        'n',
        'promise',
        'prettier'
      ],
      rules: {
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto'
          }
        ],
        'no-console': 'error',

        // JSDoc blocks are optional by default
        'jsdoc/require-jsdoc': 'off',

        // JSDoc @param types are mandatory for JavaScript
        'jsdoc/require-param-description': 'off',
        'jsdoc/require-param-type': 'error',
        'jsdoc/require-param': 'off',

        // JSDoc @returns is optional
        'jsdoc/require-returns-description': 'off',
        'jsdoc/require-returns-type': 'off',
        'jsdoc/require-returns': 'off',

        // Check for mandatory file extensions
        // https://nodejs.org/api/esm.html#mandatory-file-extensions
        'import/extensions': ['error', 'ignorePackages'],

        // Skip rules handled by TypeScript compiler
        'import/default': 'off',
        'import/namespace': 'off',
        'n/no-extraneous-require': 'off',
        'n/no-extraneous-import': 'off',
        'n/no-missing-require': 'off',
        'n/no-missing-import': 'off'
      },
      settings: {
        'import/parsers': {
          '@typescript-eslint/parser': ['.cjs', '.js']
        },
        'import/resolver': {
          node: true,
          typescript: true
        }
      }
    },
    {
      files: ['**/*.js'],
      parserOptions: {
        sourceType: 'module'
      }
    },
    {
      env: {
        commonjs: true
      },
      files: ['**/*.cjs'],
      parserOptions: {
        sourceType: 'commonjs'
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off'
      }
    },
    {
      env: {
        browser: true,
        node: false
      },
      files: ['src/client/**/*.js']
    },
    {
      env: {
        'jest/globals': true
      },
      extends: [
        'plugin:jest/recommended',
        'plugin:jest-formatting/recommended'
      ],
      files: ['**/*.test.{cjs,js}'],
      plugins: ['jest'],
      rules: {
        // Allow Jest to assert on mocked unbound methods
        '@typescript-eslint/unbound-method': 'off',
        'jest/unbound-method': 'error'
      }
    }
  ],
  root: true
}
