import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { SPARTACUS_SCHEMATICS } from '../../../shared/libs-constants';
import path from 'path';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as SpartacusOptions } from '../../../add-spartacus/schema';

const updateSsrCollectionPath = path.join(
  __dirname,
  './update-ssr.collection.json'
);
const collectionPath = path.join(__dirname, '../../../collection.json');

describe('Update SSR', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );
  const updateSsrSchematicRunner = new SchematicTestRunner(
    'test',
    updateSsrCollectionPath
  );

  let tree: UnitTestTree;

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
    standalone: false,
  };
  const defaultOptions: SpartacusOptions = {
    project: 'schematics-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
  };
  beforeEach(async () => {
    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'workspace',
      workspaceOptions
    );

    tree = await schematicRunner.runExternalSchematic(
      '@schematics/angular',
      'application',
      appOptions,
      tree
    );

    tree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...defaultOptions, name: 'schematics-test' },
      tree
    );

    tree = await schematicRunner.runSchematic(
      'add-ssr',
      { ...defaultOptions, name: 'schematics-test' },
      tree
    );
  });
});
