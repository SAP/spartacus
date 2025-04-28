import { Plugin } from 'esbuild';

// Environment Variables Plugin
const resolveEnvPlugin: Plugin = {
  name: 'resolve-env-plugin',
  setup(build) {
    const env: Record<string, string | boolean | undefined> = {};
    Object.keys(process.env).forEach((key) => {
      env[key] = process.env[key] === 'true' ? true : process.env[key] === 'false' ? false : process.env[key];
    });
    build.initialOptions.bundle= true;

    build.initialOptions.define = {
      ...build.initialOptions.define,
      'buildProcess.env': JSON.stringify(env),
    };
  },
};


// Filter Warnings Plugin
const filterWarningsPlugin = (): Plugin => ({
  name: 'filter-warnings',
  setup(build) {
    build.onEnd((result) => {
      result.warnings = result.warnings.filter(
        (warning) =>
          !warning.text.includes('no side effects') &&
          !warning.text.includes('[ignored-bare-import]') &&
          !warning.text.includes('is not ESM')
      );
    });
  },
});

// Export Plugins
export default [
  resolveEnvPlugin,
  filterWarningsPlugin()
];
