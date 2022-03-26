import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { cartBaseFeatureModulePath } from '../shared/utils/test-utils';
import { Schema as SpartacusWrapperOptions } from './schema';

const collectionPath = path.join(__dirname, '../collection.json');

describe('Spartacus Wrapper Module Schematics: ng-add', () => {
  const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

  let appTree: UnitTestTree;

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
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

  describe('Checkout', () => {
    it('should generate appropriate featuer module', async () => {
      const checkoutOptions: SpartacusWrapperOptions = {
        project: 'schematics-test',
        featureModuleName: 'CheckoutModule',
      };
      appTree = await schematicRunner
        .runSchematicAsync('wrapper-module', checkoutOptions, appTree)
        .toPromise();

      const checkoutModule = appTree.readContent(cartBaseFeatureModulePath);
      console.log(checkoutModule);
    });
  });
});
