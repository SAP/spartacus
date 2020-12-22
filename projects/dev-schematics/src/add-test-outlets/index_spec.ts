import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { TEST_CONFIG_MODULE, TEST_OUTLET_MODULE } from '@spartacus/schematics';
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
    'default-base-sites': false,
    'default-routing': false,
    'test-outlets': true,
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
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@spartacus/schematics',
        'ng-add',
        { ...defaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  it('should add outlets module and config', async () => {
    const tree = await schematicRunner
      .runSchematicAsync('ng-add', defaultOptions, appTree)
      .toPromise();

    const appModule = tree.readContent('/src/app/app.module.ts');

    expect(appModule).toContain(TEST_CONFIG_MODULE);
    expect(appModule).toContain(TEST_OUTLET_MODULE);
  });

  it('should add outlets module and config', async () => {
    const tree = await schematicRunner
      .runSchematicAsync(
        'ng-add',
        { ...defaultOptions, 'test-outlets': true },
        appTree
      )
      .toPromise();

    expect(
      tree.readContent('/src/app/test-outlets/test-outlet.module.ts')
    ).toBeTruthy();
    expect(
      tree.readContent(
        '/src/app/test-outlets/test-outlet-component/test-outlet-component.module.ts'
      )
    ).toBeTruthy();
    expect(
      tree.readContent(
        '/src/app/test-outlets/test-outlet-slot/test-outlet-slot.module.ts'
      )
    ).toBeTruthy();
    expect(
      tree.readContent(
        '/src/app/test-outlets/test-outlet-template/test-outlet-template.module.ts'
      )
    ).toBeTruthy();
  });
});
