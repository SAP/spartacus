import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { getAngularVersion } from './package-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Package utils', () => {
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

  describe('getAngularVersion', () => {
    it('should return angular version', async () => {
      const testVersion = '5.5.5';
      const buffer = appTree.read('package.json');

      if (buffer) {
        const packageJsonObject = JSON.parse(buffer.toString('utf-8'));
        packageJsonObject.dependencies['@angular/core'] = testVersion;
        appTree.overwrite('package.json', JSON.stringify(packageJsonObject));
        const version = getAngularVersion(appTree);
        expect(version).toBeTruthy(testVersion);
      }
    });
  });
});
