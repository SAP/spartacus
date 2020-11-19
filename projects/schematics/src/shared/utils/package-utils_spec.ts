import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { ANGULAR_CORE, ANGULAR_LOCALIZE, UTF_8 } from '../constants';
import {
  getAngularVersion,
  getMajorVersionNumber,
  getSpartacusCurrentFeatureLevel,
  getSpartacusSchematicsVersion,
  isAngularLocalizeInstalled,
} from './package-utils';

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
        const packageJsonObject = JSON.parse(buffer.toString(UTF_8));
        packageJsonObject.dependencies[ANGULAR_CORE] = testVersion;
        appTree.overwrite('package.json', JSON.stringify(packageJsonObject));
        const version = getAngularVersion(appTree);
        expect(version).toEqual(testVersion);
      }
    });
  });

  describe('getMajorVersionNumber', () => {
    it('should return the major number', () => {
      const testVersion = '9.0.0';
      const majorVersion = getMajorVersionNumber(testVersion);
      expect(majorVersion).toEqual(9);
    });
    it('should return the major number even if the version string starts with a character', () => {
      const testVersion = '^9.0.0';
      const majorVersion = getMajorVersionNumber(testVersion);
      expect(majorVersion).toEqual(9);
    });
  });

  describe('getSpartacusSchematicsVersion', () => {
    it('should return spartacus version', async () => {
      const version = getSpartacusSchematicsVersion(appTree);
      expect(version).toBeTruthy();
      expect(version.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('getSpartacusCurrentFeatureLevel', () => {
    it('should return feature level based on spartacus current version', async () => {
      const version = getSpartacusSchematicsVersion(appTree);
      const featureLevel = getSpartacusCurrentFeatureLevel(appTree);
      expect(featureLevel).toBeTruthy();
      expect(featureLevel.length).toEqual(3);
      expect(featureLevel).toEqual(version.substring(0, 3));
    });
  });

  describe('isAngularLocalizeInstalled', () => {
    beforeEach(() => {
      const buffer = appTree.read('package.json');
      if (!buffer) {
        throw new Error('package.json not found');
      }
      let packageJsonObject = JSON.parse(buffer.toString(UTF_8));
      packageJsonObject = {
        ...packageJsonObject,
        dependencies: {
          ...packageJsonObject.dependencies,
          [ANGULAR_LOCALIZE]: '^9.0.0',
        },
      };
      appTree.overwrite('package.json', JSON.stringify(packageJsonObject));
    });
    it('should return feature level based on spartacus current version', async () => {
      expect(isAngularLocalizeInstalled(appTree)).toEqual(true);
    });
  });
});
