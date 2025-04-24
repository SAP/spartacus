import { Plugin } from 'esbuild';
import TsconfigPathsPlugin from '@esbuild-plugins/tsconfig-paths';
import * as path from 'path';
import * as fs from 'fs/promises';

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

const scssReplacePlugin: Plugin = {
  name: 'scss-replace-plugin',
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const source = await fs.readFile(args.path, 'utf8');

      // Replace @spartacus/asm with /dist/asm
      const modifiedSource = source.replace(/@spartacus\/asm/g, '/dist/asm');

      return {
        contents: modifiedSource,
        loader: 'text', // Pass the modified content as text
      };
    });
  },
};


const angularDecoratorPlugin: Plugin = {
  name: 'angular-decorator',
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      const fs = require('fs');
      const ts = require('typescript');
      const source = await fs.promises.readFile(args.path, 'utf8');
      const result = ts.transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ESNext,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
        },
      });
      return { contents: result.outputText, loader: 'ts' };
    });
  },
};


// Filter Warnings Plugin
const filterWarningsPlugin = (): Plugin => ({
  name: 'filter-warnings',
  setup(build) {
    console.log("executed");
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

const scssPreprocessPlugin: Plugin = {
  name: 'scss-preprocess-plugin',
  setup(build) {
    console.log("Executed");
    const aliasPaths: Record<string, string> = {
      '@spartacus/styles': path.join(__dirname, 'projects/storefrontstyles'),
      '@spartacus/user': path.join(__dirname, 'feature-libs/user'),
      '@spartacus/organization': path.join(__dirname, 'feature-libs/organization'),
      '@spartacus/pdf-invoices': path.join(__dirname, 'feature-libs/pdf-invoices'),
      '@spartacus/product': path.join(__dirname, 'feature-libs/product'),
      '@spartacus/product-configurator': path.join(__dirname, 'feature-libs/product-configurator'),
      '@spartacus/product-multi-dimensional': path.join(__dirname, 'feature-libs/product-multi-dimensional'),
      '@spartacus/storefinder': path.join(__dirname, 'feature-libs/storefinder'),
      '@spartacus/checkout': path.join(__dirname, 'feature-libs/checkout'),
      '@spartacus/asm': path.join(__dirname, 'feature-libs/asm'),
      '@spartacus/smartedit': path.join(__dirname, 'feature-libs/smartedit'),
      '@spartacus/qualtrics': path.join(__dirname, 'feature-libs/qualtrics'),
      '@spartacus/requested-delivery-date': path.join(__dirname, 'feature-libs/requested-delivery-date'),
      '@spartacus/estimated-delivery-date': path.join(__dirname, 'feature-libs/estimated-delivery-date'),
      '@spartacus/tracking': path.join(__dirname, 'feature-libs/tracking'),
      '@spartacus/cart': path.join(__dirname, 'feature-libs/cart'),
      '@spartacus/order': path.join(__dirname, 'feature-libs/order'),
      '@spartacus/quote': path.join(__dirname, 'feature-libs/quote'),
      '@spartacus/epd-visualization': path.join(__dirname, 'integration-libs/epd-visualization'),
      '@spartacus/customer-ticketing': path.join(__dirname, 'feature-libs/customer-ticketing'),
      '@spartacus/pickup-in-store': path.join(__dirname, 'feature-libs/pickup-in-store'),
      '@spartacus/s4om': path.join(__dirname, 'integration-libs/s4om'),
      '@spartacus/opf': path.join(__dirname, 'integration-libs/opf'),
      '@spartacus/s4-service': path.join(__dirname, 'integration-libs/s4-service'),
      '@spartacus/omf': path.join(__dirname, 'integration-libs/omf'),
    };

    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      let source = await fs.readFile(args.path, 'utf8');

      // Replace symbolic imports with resolved paths
      for (const [alias, resolvedPath] of Object.entries(aliasPaths)) {
        const regex = new RegExp(`@import\\s+['"]${alias}`, 'g');
        source = source.replace(regex, `@import '${resolvedPath}`);
      }

      return {
        contents: source,
        loader: 'text', // Pass the modified content as text
      };
    });
  },
};

const postProcessScssPlugin: Plugin = {
  name: 'post-process-scss-plugin',
  setup(build) {
    console.log('post-process-scss-plugion')
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      console.log('loaded files', args.path);
    //  const fs = require('fs/promises');
      const sass = require('sass');

      // Compile SCSS to CSS
      const result = sass.renderSync({ file: args.path });

      let css = result.css.toString();

      // Perform post-processing (e.g., replace variables, add prefixes)
      css = css.replace(/--custom-variable/g, '--processed-variable');

      return {
        contents: css,
        loader: 'css', // Return the processed CSS
      };
    });
  }
};


// Export Plugins
export default [
  angularDecoratorPlugin,
  resolveEnvPlugin,
  postProcessScssPlugin,
  TsconfigPathsPlugin({
    tsconfig: './projects/storefrontapp/tsconfig.app.prod.json',
  }),
  scssPreprocessPlugin,
  scssReplacePlugin,
  filterWarningsPlugin()
];
