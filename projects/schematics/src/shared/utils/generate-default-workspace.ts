import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../libs-constants';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';

const workspaceOptions: WorkspaceOptions = {
  name: 'workspace',
  version: '0.5.0',
};
const appOptions: ApplicationOptions = {
  name: 'schematics-test',
  inlineStyle: false,
  inlineTemplate: false,
  style: Style.Scss,
  skipTests: false,
  projectRoot: '',
  standalone: false,
};
const spartacusDefaultOptions: SpartacusOptions = {
  project: 'schematics-test',
  lazy: true,
  features: [],
};
export async function generateDefaultWorkspace(
  schematicRunner: SchematicTestRunner,
  appTree: UnitTestTree
) {
  schematicRunner.registerCollection(
    SPARTACUS_SCHEMATICS,
    '../../projects/schematics/src/collection.json'
  );

  appTree = await schematicRunner.runExternalSchematic(
    '@schematics/angular',
    'workspace',
    workspaceOptions
  );
  appTree = await schematicRunner.runExternalSchematic(
    '@schematics/angular',
    'application',
    appOptions,
    appTree
  );
  appTree = await schematicRunner.runExternalSchematic(
    SPARTACUS_SCHEMATICS,
    'ng-add',
    { ...spartacusDefaultOptions, name: 'schematics-test' },
    appTree
  );
  return appTree;
}
