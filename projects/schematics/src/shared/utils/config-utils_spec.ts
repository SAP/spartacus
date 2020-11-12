import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import path from 'path';
import * as ts from 'typescript';
import {
  createNewConfig,
  getConfig,
  getExistingStorefrontConfigNode,
  mergeConfig,
} from './config-utils';
import { commitChanges, getTsSourceFile } from './file-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Storefront config utils', () => {
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

  describe('getExistingStorefrontConfigNode', () => {
    it('should get the Storefront config from app.module.ts file', async () => {
      const appModuleFile = getTsSourceFile(appTree, appModulePath);
      const config = getExistingStorefrontConfigNode(
        appModuleFile
      ) as ts.CallExpression;

      expect(config).toBeTruthy();
      expect(config.getFullText()).toContain('B2cStorefrontModule.withConfig');
    });
  });

  describe('getConfig', () => {
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

  describe('mergeConfig', () => {
    it('should merge the provided configs', async () => {
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

    it('should create a new config if nothing to be merge', async () => {
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

  describe('createNewConfig', () => {
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
});
