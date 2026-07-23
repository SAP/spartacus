export default defineConfig({
    root: import.meta.dirname,
    plugins: [angular(), nxViteTsPaths()],
    test: {
      pool: 'forks',
      watch: false,
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setup-test.ts'],
      include: ['**/*.spec.ts'],
      typecheck: {
        tsconfig: `${import.meta.dirname}/tsconfig.spec.json`,
      },
      coverage: {
        provider: 'v8',
        reporter: ['lcov'],
        reportsDirectory: `${import.meta.dirname}/../../coverage/<lib-name>`, // ← adjust
        exclude: ['**/public_api.ts', '**/index.ts', '**/*.module.ts', 'setup-test.ts'],
        thresholds: { statements: 90, lines: 90, branches: 80, functions: 90 },
      },
      reporters: [
        'default',
        ['junit', {
          outputFile: `${import.meta.dirname}/../../unit-tests-reports/unit-test-<lib-name>.xml`, // ← adjust
        }],
      ],
    },
  });