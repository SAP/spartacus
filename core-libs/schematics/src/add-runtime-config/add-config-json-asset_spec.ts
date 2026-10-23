/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  FileNameStyleGuide,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { addConfigJsonAsset } from './add-config-json-asset';

const collectionPath = path.join(__dirname, '../collection.json');

describe('addConfigJsonAsset', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'asset-test',
    inlineStyle: false,
    inlineTemplate: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
    standalone: true,
    zoneless: false,
    fileNameStyleGuide: FileNameStyleGuide.The2016,
  };

  const defaultOptions: SpartacusOptions = {
    project: 'asset-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
    runtimeConfig: true,
  };

  async function buildTree(): Promise<UnitTestTree> {
    let appTree = await schematicRunner.runExternalSchematic(
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
    return (await firstValueFrom(
      schematicRunner.callRule(addConfigJsonAsset(defaultOptions), appTree)
    )) as UnitTestTree;
  }

  it('should add config.json asset to angular.json build assets', async () => {
    const tree = await buildTree();
    const angularJson = JSON.parse(tree.readText('/angular.json'));
    const assets =
      angularJson.projects['asset-test'].architect.build.options.assets;
    const configJsonAsset = assets.find(
      (a: any) =>
        typeof a === 'object' &&
        a.glob === 'config.json' &&
        a.input === 'src' &&
        a.output === '/'
    );
    expect(configJsonAsset).toBeTruthy();
  });

  it('should be idempotent — not duplicate asset if already present', async () => {
    const tree = await buildTree();
    // Run again on the already-modified tree
    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(addConfigJsonAsset(defaultOptions), tree)
    )) as UnitTestTree;

    const angularJson = JSON.parse(resultTree.readText('/angular.json'));
    const assets =
      angularJson.projects['asset-test'].architect.build.options.assets;
    const configJsonAssets = assets.filter(
      (a: any) =>
        typeof a === 'object' &&
        a.glob === 'config.json' &&
        a.input === 'src' &&
        a.output === '/'
    );
    expect(configJsonAssets.length).toBe(1);
  });
});
