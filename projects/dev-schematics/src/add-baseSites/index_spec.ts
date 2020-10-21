import {
  SchematicTestRunner,
  UnitTestTree
} from '@angular-devkit/schematics/testing';
import path from 'path';
import { Schema as SpartacusOptions } from '../ng-add/schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: any = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: any = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: 'scss',
    skipTests: false,
    projectRoot: '',
  };

  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    'default-base-sites': true,
    'default-routing': false,
    'test-outlets': false,
  };

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

  it('should add pre-defined base sites', async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();

    const tree = await schematicRunner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();

    const appModule = tree.readContent('/src/app/app.module.ts');

    expect(appModule).toContain(
      "urlParameters: ['baseSite', 'language', 'currency']"
    );
    expect(appModule).toContain('baseSite:');
    expect(appModule).toContain('electronics-spa');
    expect(appModule).toContain('apparel-uk-spa');
  });

  it('should merge config with already defined module options', async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        {
          ...defaultOptions,
          name: 'schematics-test',
          baseSite: 'test-en,test-de',
        },
        appTree
      )
      .toPromise();

    const tree = await schematicRunner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();

    const appModule = tree.readContent('/src/app/app.module.ts');

    expect(appModule).toContain(
      "urlParameters: ['baseSite', 'language', 'currency']"
    );
    expect(appModule).toContain('baseSite:');
    expect(appModule).toContain('electronics-spa');
    expect(appModule).toContain('apparel-uk-spa');
    expect(appModule).toContain('test-en');
    expect(appModule).toContain('test-de');
  });
});
