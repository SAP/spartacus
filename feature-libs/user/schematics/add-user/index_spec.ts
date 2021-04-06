import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  LibraryOptions as SpartacusPersonalizationOptions,
  SpartacusOptions,
} from '@spartacus/schematics';
import * as path from 'path';
import { CLI_ACCOUNT_FEATURE, CLI_PROFILE_FEATURE } from '../constants';

const collectionPath = path.join(__dirname, '../collection.json');
const userFeatureModulePath =
  'src/app/spartacus/features/user/user-feature.module.ts';

// TODO: Improve tests after lib-util test update
describe('Spartacus User schematics: ng-add', () => {
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

  const defaultOptions: SpartacusPersonalizationOptions = {
    project: 'schematics-test',
    lazy: true,
    features: [CLI_ACCOUNT_FEATURE, CLI_PROFILE_FEATURE],
  };

  const spartacusDefaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    configuration: 'b2c',
    lazy: true,
    features: [],
  };

  beforeEach(async () => {
    schematicRunner.registerCollection(
      '@spartacus/schematics',
      '../../projects/schematics/src/collection.json'
    );

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
        { ...spartacusDefaultOptions, name: 'schematics-test' },
        appTree
      )
      .toPromise();
  });

  describe('Account feature', () => {
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).toContain(
          `import { UserAccountRootModule } from "@spartacus/user/account/root";`
        );
        expect(module).toContain(
          `import { UserAccountModule } from "@spartacus/user/account";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).not.toContain(`import('@spartacus/user/account').then(`);
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import UserAccountRootModule and contain the lazy loading syntax', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).toContain(
          `import { UserAccountRootModule } from "@spartacus/user/account/root";`
        );
        expect(module).toContain(`import('@spartacus/user/account').then(`);
      });

      it('should not contain the UserAccountModule import', () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).not.toContain(
          `import { UserAccountModule } from "@spartacus/user/account";`
        );
      });
    });
  });

  describe('Profile feature', () => {
    describe('eager loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync(
            'ng-add',
            { ...defaultOptions, lazy: false },
            appTree
          )
          .toPromise();
      });

      it('should import appropriate modules', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).toContain(
          `import { UserProfileRootModule } from "@spartacus/user/profile/root";`
        );
        expect(module).toContain(
          `import { UserProfileModule } from "@spartacus/user/profile";`
        );
      });

      it('should not contain lazy loading syntax', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).not.toContain(`import('@spartacus/user/profile').then(`);
      });
    });

    describe('lazy loading', () => {
      beforeEach(async () => {
        appTree = await schematicRunner
          .runSchematicAsync('ng-add', defaultOptions, appTree)
          .toPromise();
      });

      it('should import UserProfileRootModule and contain the lazy loading syntax', async () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).toContain(
          `import { UserProfileRootModule } from "@spartacus/user/profile/root";`
        );
        expect(module).toContain(`import('@spartacus/user/profile').then(`);
      });

      it('should not contain the UserAccountModule import', () => {
        const module = appTree.readContent(userFeatureModulePath);
        expect(module).not.toContain(
          `import { UserAccountModule } from "@spartacus/user/profile";`
        );
      });
    });
  });
});
