import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { Schema as SpartacusOptions } from '../../add-spartacus/schema';
import {
  SPARTACUS_SCHEMATICS,
  USER_PROFILE_FEATURE_NAME,
} from '../libs-constants';
import {
  debugLogRule,
  formatFeatureComplete,
  formatFeatureStart,
} from './logger-utils';

describe('Logger utils', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../../collection.json')
  );

  let appTree: Tree;

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
    features: [USER_PROFILE_FEATURE_NAME],
    debug: true,
  };

  beforeEach(async () => {
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

    appTree = await schematicRunner.runSchematic(
      'add-spartacus',
      { ...spartacusDefaultOptions, name: 'schematics-test' },
      appTree
    );
  });

  describe('debugLog', () => {
    let lastLogMessage: string | undefined;
    beforeEach(() => {
      schematicRunner.logger.subscribe((log) => {
        lastLogMessage = log.message;
      });
    });

    it('should NOT log the message if the debug is false', async () => {
      await schematicRunner
        .callRule(debugLogRule(`xxx`, false), appTree)
        .toPromise();

      expect(lastLogMessage).not.toEqual(`xxx`);
    });
  });

  describe('formatFeatureStart', () => {
    it('should format the message', () => {
      const message = formatFeatureStart('featurename', 'xxx');
      expect(message).toEqual(`⌛️ featurename: xxx`);
    });
  });

  describe('formatFeatureComplete', () => {
    it('should format the message', () => {
      const message = formatFeatureComplete('featurename', 'xxx');
      expect(message).toEqual(`✅ featurename: xxx`);
    });
  });
});
