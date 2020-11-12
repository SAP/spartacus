import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { Schema as SpartacusOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('add-spartacus', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    newProjectRoot: 'projects',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    occPrefix: 'xxx',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
  };

  const newLineRegEx = /(?:\\[rn]|[\r\n]+)+/g;

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
  });

  it('should add spartacus deps', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
    const packageJson = tree.readContent('/package.json');
    const packageObj = JSON.parse(packageJson);
    const depPackageList = Object.keys(packageObj.dependencies);
    expect(depPackageList.includes('@spartacus/core')).toBe(true);
    expect(depPackageList.includes('@spartacus/storefront')).toBe(true);
    expect(depPackageList.includes('@spartacus/styles')).toBe(true);
  });

  it('Import Spartacus modules in app.module', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
    const appModule = tree.readContent(
      '/projects/schematics-test/src/app/app.module.ts'
    );
    expect(
      appModule.includes(
        `import { B2cStorefrontModule } from '@spartacus/storefront';`
      )
    ).toBe(true);
  });

  describe('Setup configuration', () => {
    it('should set baseUrl', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, baseUrl: 'test-url' },
          appTree
        )
        .toPromise();
      const configFile = tree.readContent(
        '/src/app/spartacus-configuration.ts'
      );
      expect(configFile.includes(`baseUrl: 'test-url'`)).toBe(true);
    });

    it('should set occPrefix', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, occPrefix: '/occ/v2/' },
          appTree
        )
        .toPromise();
      const configFile = tree.readContent(
        '/src/app/spartacus-configuration.ts'
      );
      expect(configFile.includes(`prefix: '/occ/v2/'`)).toBe(true);
    });

    it('should set feature level', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, featureLevel: '1.5' },
          appTree
        )
        .toPromise();
      const configFile = tree.readContent(
        '/src/app/spartacus-configuration.ts'
      );
      expect(configFile.includes(`level: '1.5'`)).toBe(true);
    });

    it('should set styleVersion based on featureLevel', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, featureLevel: '5.5' },
          appTree
        )
        .toPromise();
      const scssFile = tree.readContent(
        '/projects/schematics-test/src/styles.scss'
      );
      expect(scssFile.includes(`$styleVersion: 5.5`)).toBe(true);
    });

    describe('context config', () => {
      describe('baseSite', () => {
        it('should set a single baseSite', async () => {
          const tree = await schematicRunner
            .runSchematicAsync(
              'add-spartacus',
              { ...defaultOptions, baseSite: 'test-site' },
              appTree
            )
            .toPromise();
          const configFile = tree.readContent(
            '/src/app/spartacus-configuration.ts'
          );
          expect(configFile.includes(`baseSite: ['test-site']`)).toBe(true);
        });

        it('should set multiple baseSites', async () => {
          const tree = await schematicRunner
            .runSchematicAsync(
              'add-spartacus',
              {
                ...defaultOptions,
                baseSite:
                  'electronics-spa,apparel-uk-spa,apparel-uk,electronics,apparel-de',
              },
              appTree
            )
            .toPromise();
          const configFile = tree.readContent(
            '/src/app/spartacus-configuration.ts'
          );

          expect(
            configFile.includes(
              `baseSite: ['electronics-spa', 'apparel-uk-spa', 'apparel-uk', 'electronics', 'apparel-de']`
            )
          ).toBe(true);
        });
      });

      it('should enable auto-base site by omitting context property in config', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              baseSite: '',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`baseSite: [`)).toBeFalsy();
      });
    });

    describe('currency', () => {
      it('should set the default currency when not provided', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`currency: ['USD']`)).toBe(true);
      });
      it('should set the single currency', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              currency: 'rsd',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`currency: ['RSD']`)).toBe(true);
      });
      it('should set multiple currencies', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              currency: 'CAD,rsd',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`currency: ['CAD', 'RSD']`)).toBe(true);
      });
    });
    describe('language', () => {
      it('should set the default language when not provided', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`language: ['en']`)).toBe(true);
      });
      it('should set the single language', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              language: 'SR',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`language: ['sr']`)).toBe(true);
      });
      it('should set multiple languages', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              language: 'EN,SR',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(configFile.includes(`language: ['en', 'sr']`)).toBe(true);
      });
    });

    describe('baseSite, language and currency', () => {
      it('should combine all context params properly', async () => {
        const tree = await schematicRunner
          .runSchematicAsync(
            'add-spartacus',
            {
              ...defaultOptions,
              baseSite:
                'electronics-spa,apparel-uk-spa,apparel-uk,electronics,apparel-de',
              currency: 'CAD,rsd',
              language: 'EN,SR',
            },
            appTree
          )
          .toPromise();
        const configFile = tree.readContent(
          '/src/app/spartacus-configuration.ts'
        );

        expect(
          configFile.includes(`
  context: {
    currency: ['CAD', 'RSD'],
    language: ['en', 'sr'],
    baseSite: ['electronics-spa', 'apparel-uk-spa', 'apparel-uk', 'electronics', 'apparel-de']
  },`)
        ).toBe(true);
      });
    });
  });

  it('Import Spartacus styles to main.scss', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
    const stylesFile = tree.readContent(
      '/projects/schematics-test/src/styles.scss'
    );
    expect(stylesFile.includes(`@import '~@spartacus/styles/index';`)).toBe(
      true
    );
  });

  it('Overwrite app.component with cx-storefront', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'add-spartacus',
        { ...defaultOptions, overwriteAppComponent: true },
        appTree
      )
      .toPromise();
    const appComponentTemplate = tree
      .readContent('/projects/schematics-test/src/app/app.component.html')
      .replace(newLineRegEx, '');

    expect(appComponentTemplate).toEqual(`<cx-storefront></cx-storefront>`);
  });

  it('Add cx-storefront component to your app.component', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'add-spartacus',
        { ...defaultOptions, overwriteAppComponent: false },
        appTree
      )
      .toPromise();
    const appComponentTemplate = tree.readContent(
      '/projects/schematics-test/src/app/app.component.html'
    );
    const cxTemplate = `<cx-storefront></cx-storefront>`;
    expect(appComponentTemplate.includes(cxTemplate)).toBe(true);
    expect(appComponentTemplate.length).toBeGreaterThan(cxTemplate.length);
  });

  describe('Update index.html', async () => {
    it('should not add meta tags by default', async () => {
      const tree = await schematicRunner
        .runSchematicAsync('add-spartacus', defaultOptions, appTree)
        .toPromise();
      const indexHtmlFile = tree.readContent(
        '/projects/schematics-test/src/index.html'
      );
      expect(indexHtmlFile.includes(`<meta name="occ-backend-base-url"`)).toBe(
        false
      );
      expect(
        indexHtmlFile.includes(`<meta name="media-backend-base-url"`)
      ).toBe(false);
    });

    it('should add meta tags', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, useMetaTags: true },
          appTree
        )
        .toPromise();
      const indexHtmlFile = tree.readContent(
        '/projects/schematics-test/src/index.html'
      );
      expect(
        indexHtmlFile.includes(
          `<meta name="occ-backend-base-url" content="${defaultOptions.baseUrl}" />`
        )
      ).toBe(true);
      expect(
        indexHtmlFile.includes(
          `<meta name="media-backend-base-url" content="MEDIA_BACKEND_BASE_URL_VALUE" />`
        )
      ).toBe(true);
    });

    it('should set baseUrl in meta tag', async () => {
      const tree = await schematicRunner
        .runSchematicAsync(
          'add-spartacus',
          { ...defaultOptions, useMetaTags: true, baseUrl: 'test-url' },
          appTree
        )
        .toPromise();
      const indexHtmlFile = tree.readContent(
        '/projects/schematics-test/src/index.html'
      );
      const configFile = tree.readContent(
        '/src/app/spartacus-configuration.ts'
      );
      expect(
        indexHtmlFile.includes(
          `<meta name="occ-backend-base-url" content="test-url" />`
        )
      ).toBe(true);
      expect(configFile.includes(`baseUrl:`)).toBe(false);
    });
  });
});
