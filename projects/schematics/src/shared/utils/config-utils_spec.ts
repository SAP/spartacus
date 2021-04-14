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
import * as path from 'path';
import { InMemoryFileSystemHost, Project, SourceFile } from 'ts-morph';
import ts from 'typescript';
import {
  createNewConfig,
  getConfig,
  getConfigs,
  getExistingStorefrontConfigNode,
  getSpartacusProviders,
  mergeConfig,
} from './config-utils';
import { commitChanges, getTsSourceFile } from './file-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

// TODO:#10744 - cleanup after implementing the new config utils.
describe('Storefront config utils', () => {
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
  const defaultOptions = {
    project: 'schematics-test',
  };
  const appModulePath = 'src/app/app.module.ts';

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
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe.skip('getExistingStorefrontConfigNode', () => {
    it('should get the Storefront config from app.module.ts file', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;

      expect(config).toBeTruthy();
      expect(config.getFullText()).toContain('B2cStorefrontModule.withConfig');
    });
  });

  describe.skip('getConfig', () => {
    it('should return the specified config from Storefront CallExpression AST node object', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const currentContextConfig = getConfig(config, 'context');

      expect(currentContextConfig).toBeTruthy();
      expect(currentContextConfig?.getFullText()).toContain('currency:');
    });

    it('should return an undefined if the provided configName was not found', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const configByName = getConfig(config, 'test');

      expect(configByName).toBeFalsy();
      expect(configByName).toEqual(undefined);
    });
  });

  describe.skip('mergeConfig', () => {
    it('should merge the provided config array', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const currentContextConfig = getConfig(
        config,
        'context'
      ) as ts.PropertyAssignment;
      const currencyChange = mergeConfig(
        appModulePath,
        currentContextConfig,
        'currency',
        ['EUR', 'JPY']
      );

      expect(appTree.readContent(appModulePath)).not.toContain('EUR');
      expect(appTree.readContent(appModulePath)).not.toContain('JPY');

      commitChanges(appTree, appModulePath, [currencyChange]);

      expect(appTree.readContent(appModulePath)).toContain('EUR');
      expect(appTree.readContent(appModulePath)).toContain('JPY');
    });

    it('should merge the provided regular config', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const backendConfig = getConfig(
        config,
        'backend'
      ) as ts.PropertyAssignment;

      const change = mergeConfig(appModulePath, backendConfig, 'occ', 'random');

      expect(appTree.readContent(appModulePath)).not.toContain('random');
      commitChanges(appTree, appModulePath, [change]);
      expect(appTree.readContent(appModulePath)).toContain('random');
    });

    it('should create a new config if there is nothing to be mergex', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const currentContextConfig = getConfig(
        config,
        'context'
      ) as ts.PropertyAssignment;
      const baseSiteChange = mergeConfig(
        appModulePath,
        currentContextConfig,
        'urlParameters',
        ['baseSite', 'language', 'currency']
      );

      expect(appTree.readContent(appModulePath)).not.toContain(
        'urlParameters:'
      );

      commitChanges(appTree, appModulePath, [baseSiteChange]);

      expect(appTree.readContent(appModulePath)).toContain('urlParameters:');
    });
  });

  describe.skip('createNewConfig', () => {
    it('should nest the given new config in the given config object', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;
      const currentContextConfig = getConfig(
        config,
        'context'
      ) as ts.PropertyAssignment;
      const testConfigChange = createNewConfig(
        appModulePath,
        currentContextConfig,
        'testObjectConfig',
        ['value1', 'value2']
      );

      expect(appTree.readContent(appModulePath)).not.toContain(
        'testObjectConfig:'
      );

      commitChanges(appTree, appModulePath, [testConfigChange]);

      expect(appTree.readContent(appModulePath)).toContain('testObjectConfig:');
      expect(appTree.readContent(appModulePath)).toContain('value1');
      expect(appTree.readContent(appModulePath)).toContain('value2');
    });
  });

  describe('ts-morph config utils', () => {
    const configFileContent = `
import { NgModule } from '@angular/core';
import {
CartAddEntrySuccessEvent,
CartRemoveEntrySuccessEvent,
provideConfig,
} from '@spartacus/core';
import { NavigationEvent, defaultCmsContentProviders } from '@spartacus/storefront';
import { PersonalizationRootModule } from '@spartacus/tracking/personalization/root';
import { AepModule } from '@spartacus/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmModule } from '@spartacus/tracking/tms/gtm';
import { someFunction, someSpread } from '@some/package';

@NgModule({
imports: [
BaseTmsModule.forRoot(),
GtmModule,
AepModule,
PersonalizationRootModule,
],
providers: [
someFunction(),
...someSpread,
...defaultCmsContentProviders,
provideConfig(<TmsConfig>{
  tagManager: {
    gtm: {
      events: [NavigationEvent, CartAddEntrySuccessEvent],
    },
    aep: {
      events: [NavigationEvent, CartRemoveEntrySuccessEvent],
    },
  },
}),
provideConfig({
  featureModules: {
    personalization: {
      module: () =>
        import('@spartacus/tracking/personalization').then(
          (m) => m.PersonalizationModule
        ),
    },
  },
}),
],
})
export class TrackingFeatureModule {}
`;
    let sourceFile: SourceFile;

    beforeAll(() => {
      const project = new Project({
        fileSystem: new InMemoryFileSystemHost(),
      });
      sourceFile = project.createSourceFile('test.ts', configFileContent);
    });

    describe('getConfigs', () => {
      it('should return all configs from provideConfigs calls', () => {
        const configs = getConfigs(sourceFile);
        expect(configs.length).toEqual(2);
        expect(configs[0].getText()).toMatchSnapshot();
        expect(configs[1].getText()).toMatchSnapshot();
      });
    });

    describe('getSpartacusProviders', () => {
      it('should return all providers from spartacus in file', () => {
        const providers = getSpartacusProviders(sourceFile);
        expect(providers.length).toEqual(3);
        expect(providers[0].getText()).toMatchSnapshot();
        expect(providers[1].getText()).toMatchSnapshot();
        expect(providers[2].getText()).toMatchSnapshot();
      });
    });
  });
});
