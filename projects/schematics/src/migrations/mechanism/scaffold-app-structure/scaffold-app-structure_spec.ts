/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import { scaffoldAppStructure } from './scaffold-app-structure';

const spartacusModulePath = 'src/app/spartacus/spartacus.module.ts';
const exampleSpartacusModule = `
import { NgModule } from '@angular/core';
import { BaseStorefrontModule } from "@spartacus/storefront";
import {MyFeature} from './my-feature.module';
import { SpartacusConfigurationModule } from './spartacus-configuration.module';
import { SpartacusFeaturesModule } from './spartacus-features.module';

@NgModule({
  declarations: [],
  imports: [
    MyFeature,
    SpartacusFeaturesModule,
    SpartacusConfigurationModule,
    BaseStorefrontModule
  ],
  exports: [BaseStorefrontModule]
})
export class SpartacusModule { }
`;

const featuresModulePath = 'src/app/spartacus/spartacus-features.module.ts';
const exampleFeaturesModule = `
import { NgModule } from '@angular/core';
import { AsmFeatureModule } from './features/asm/asm-feature.module';

@NgModule({
  declarations: [],
  imports: [AsmFeatureModule],
})
export class SpartacusFeaturesModule {}
`;

const configurationModulePath =
  'src/app/spartacus/spartacus-configuration.module.ts';
const exampleConfigurationModule = `import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { layoutConfig } from '@spartacus/storefront';

@NgModule({
  providers: [provideConfig(layoutConfig)],
})
export class SpartacusConfigurationModule {}
`;

describe('scaffold app structure', () => {
  let appTree: UnitTestTree;
  let schematicRunner: SchematicTestRunner;

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
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
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
  });

  describe('When the new app structure does NOT exist', () => {
    it('should create it', async () => {
      const resultTree = await schematicRunner
        .callRule(scaffoldAppStructure(), appTree)
        .toPromise();

      expect(resultTree.read(featuresModulePath)?.toString()).toMatchSnapshot();
      expect(
        resultTree.read(configurationModulePath)?.toString()
      ).toMatchSnapshot();
      expect(
        resultTree.read(spartacusModulePath)?.toString()
      ).toMatchSnapshot();
    });
  });

  describe('When the new app structure is already in place', () => {
    beforeEach(async () => {
      appTree.create(spartacusModulePath, exampleSpartacusModule);
      appTree.create(featuresModulePath, exampleFeaturesModule);
      appTree.create(configurationModulePath, exampleConfigurationModule);
    });

    it('should not touch it', async () => {
      const resultTree = await schematicRunner
        .callRule(scaffoldAppStructure(), appTree)
        .toPromise();

      expect(resultTree.read(featuresModulePath)?.toString()).toMatchSnapshot();
      expect(
        resultTree.read(configurationModulePath)?.toString()
      ).toMatchSnapshot();
      expect(
        resultTree.read(spartacusModulePath)?.toString()
      ).toMatchSnapshot();
    });
  });
});
