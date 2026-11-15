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

  async function buildTree(
    preCreate?: (tree: UnitTestTree) => void
  ): Promise<UnitTestTree> {
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
    if (preCreate) {
      preCreate(appTree as UnitTestTree);
    }
    return (await firstValueFrom(
      schematicRunner.callRule(addProxyConf(defaultOptions), appTree)
    )) as UnitTestTree;
  }

  it('should create proxy.conf.js (not .json) at the project root', async () => {
    const tree = await buildTree();
    expect(tree.exists('/proxy.conf.js')).toBe(true);
    expect(tree.exists('/proxy.conf.json')).toBe(false);
  });

  it('should write a bypass function that reads config.json via __dirname', async () => {
    const tree = await buildTree();
    const content = tree.readText('/proxy.conf.js');
    expect(content).toContain('bypass');
    expect(content).toContain('__dirname');
    expect(content).toContain("'Content-Type', 'application/json'");
  });

  it('should set Cache-Control: no-store in the bypass function', async () => {
    const tree = await buildTree();
    const content = tree.readText('/proxy.conf.js');
    expect(content).toContain("'Cache-Control', 'no-store'");
  });

  it('should not reference port 4222 or the old dev proxy', async () => {
    const tree = await buildTree();
    const content = tree.readText('/proxy.conf.js');
    expect(content).not.toContain('4222');
    expect(content).not.toContain('spartacus-dev-proxy');
  });

  it('should wire proxyConfig: proxy.conf.js in angular.json serve options', async () => {
    const tree = await buildTree();
    const angularJson = JSON.parse(tree.readText('/angular.json'));
    const serveOptions =
      angularJson.projects['proxy-test'].architect.serve.options;
    expect(serveOptions.proxyConfig).toBe('proxy.conf.js');
  });

  it('should be idempotent — not overwrite proxy.conf.js if already present', async () => {
    const existing = '// existing proxy config\nmodule.exports = {};';
    const tree = await buildTree((appTree) => {
      appTree.create('/proxy.conf.js', existing);
    });
    expect(tree.readText('/proxy.conf.js')).toBe(existing);
  });

  it('should be idempotent — not overwrite proxy.conf.json if already present', async () => {
    const existing = JSON.stringify({ '/custom': { target: 'http://custom' } });
    const tree = await buildTree((appTree) => {
      appTree.create('/proxy.conf.json', existing);
    });
    // Must not create proxy.conf.js when proxy.conf.json already exists
    expect(tree.exists('/proxy.conf.js')).toBe(false);
    expect(tree.readText('/proxy.conf.json')).toBe(existing);
  });

  it('should be idempotent — not duplicate proxyConfig in angular.json', async () => {
    const firstTree = await buildTree();
    const resultTree = (await firstValueFrom(
      schematicRunner.callRule(addProxyConf(defaultOptions), firstTree)
    )) as UnitTestTree;

    const angularJson = JSON.parse(resultTree.readText('/angular.json'));
    const serveOptions =
      angularJson.projects['proxy-test'].architect.serve.options;
    expect(serveOptions.proxyConfig).toBe('proxy.conf.js');
  });
});
