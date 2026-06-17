import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['core-libs/core/**/*.spec.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../coverage/core',
      thresholds: {
        statements: 90,
        lines: 90,
        branches: 80,
        functions: 90,
      },
    },
    reporters: ['default', 'junit'],
    outputFile: { junit: '../../unit-tests-reports/unit-test-core.xml' },
  },
});
