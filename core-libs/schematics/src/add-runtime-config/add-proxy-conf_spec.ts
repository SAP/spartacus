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
import { addProxyConf } from './add-proxy-conf';

const collectionPath = path.join(__dirname, '../collection.json');

describe('addProxyConf', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'proxy-test',
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
    project: 'proxy-test',
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
      schematicRunner.callRule(addProxyConf(defaultOptions), appTree)
    )) as UnitTestTree;
  }

  it('should create proxy.conf.json at the project root', async () => {
    const tree = await buildTree();
    expect(tree.exists('/proxy.conf.json')).toBe(true);
  });

  it('should write correct proxy.conf.json content', async () => {
    const tree = await buildTree();
    const content = JSON.parse(tree.readText('/proxy.conf.json'));
    expect(content['/config.json']).toEqual({
      target: 'http://localhost:4222',
      secure: false,
      logLevel: 'warn',
    });
  });

  it('should add proxyConfig to angular.json serve options', async () => {
    const tree = await buildTree();
    const angularJson = JSON.parse(tree.readText('/angular.json'));
    const serveOptions =
      angularJson.projects['proxy-test'].architect.serve.options;
    expect(serveOptions.proxyConfig).toBe('proxy.conf.json');
  });

  it('should be idempotent — not overwrite proxy.conf.json if already present', async () => {
    const firstTree = await buildTree();
    // Modify the file to simulate a custom version
    firstTree.overwrite(
      '/proxy.conf.json',
      JSON.stringify({ '/custom': { target: 'http://custom' } })
    );

    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(addProxyConf(defaultOptions), firstTree)
    )) as UnitTestTree;

    const content = JSON.parse(resultTree.readText('/proxy.conf.json'));
    expect(content['/custom']).toBeDefined();
    expect(content['/config.json']).toBeUndefined();
  });

  it('should be idempotent — not duplicate proxyConfig in angular.json', async () => {
    const firstTree = await buildTree();
    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(addProxyConf(defaultOptions), firstTree)
    )) as UnitTestTree;

    const angularJson = JSON.parse(resultTree.readText('/angular.json'));
    const serveOptions =
      angularJson.projects['proxy-test'].architect.serve.options;
    expect(serveOptions.proxyConfig).toBe('proxy.conf.json');
  });
});
