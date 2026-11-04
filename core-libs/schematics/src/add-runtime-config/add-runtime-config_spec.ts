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
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';

const collectionPath = path.join(__dirname, '../collection.json');

describe('addRuntimeConfig (integration)', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'myapp',
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
    project: 'myapp',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
    runtimeConfig: true,
  };

  async function buildTree(
    options: SpartacusOptions = defaultOptions
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
    return schematicRunner.runSchematic('add-runtime-config', options, appTree);
  }

  describe('CSR (ssr: false)', () => {
    it('should create config.json at the workspace root with placeholder keys', async () => {
      const tree = await buildTree();
      expect(tree.exists('/config.json')).toBe(true);
      const content = JSON.parse(tree.readText('/config.json'));
      expect(content).toHaveProperty('OCC_BASE_URL');
      expect(content).toHaveProperty('MEDIA_BASE_URL');
    });

    it('should create proxy.conf.json at the workspace root', async () => {
      const tree = await buildTree();
      expect(tree.exists('/proxy.conf.json')).toBe(true);
      const content = JSON.parse(tree.readText('/proxy.conf.json'));
      expect(content['/config.json'].target).toBe('http://localhost:4222');
    });

    it('should wire proxyConfig in angular.json serve target', async () => {
      const tree = await buildTree();
      const angularJson = JSON.parse(tree.readText('/angular.json'));
      const serveOptions =
        angularJson.projects['myapp'].architect.serve.options;
      expect(serveOptions.proxyConfig).toBe('proxy.conf.json');
    });

    it('should wrap bootstrapApplication with getRuntimeEnvironment in main.ts', async () => {
      const tree = await buildTree();
      const main = tree.readText('/src/main.ts');
      expect(main).toContain('getRuntimeEnvironment()');
      expect(main).toContain('RUNTIME_ENVIRONMENT');
      expect(main).toContain('@spartacus/setup');
    });

    it('should add provideRuntimeOccConfig to app.config.ts', async () => {
      const tree = await buildTree();
      const appConfig = tree.readText('/src/app/app.config.ts');
      expect(appConfig).toContain('provideRuntimeOccConfig()');
      expect(appConfig).toContain('@spartacus/setup');
    });

    it('should place provideRuntimeOccConfig after importProvidersFrom in app.config.ts', async () => {
      const tree = await buildTree();
      const appConfig = tree.readText('/src/app/app.config.ts');
      // Both tokens include the opening paren so they match only call sites, not import
      // identifiers — comparing positions in the full file is unambiguous and robust to
      // providers with nested arrays (which would truncate a regex-based extraction).
      const importProvidersFromPos = appConfig.indexOf('importProvidersFrom(');
      const provideRuntimeOccConfigPos = appConfig.indexOf('provideRuntimeOccConfig(');
      // provideRuntimeOccConfig must come after importProvidersFrom so it overrides the
      // meta-tag OCC URL that MetaTagConfigModule (loaded via importProvidersFrom) registers —
      // Spartacus merges ConfigChunk providers in declaration order, last wins.
      // If importProvidersFrom is absent (plain Angular app without AppModule), skip ordering.
      if (importProvidersFromPos !== -1) {
        expect(provideRuntimeOccConfigPos).toBeGreaterThan(importProvidersFromPos);
      } else {
        expect(provideRuntimeOccConfigPos).not.toBe(-1);
      }
    });

    it('should not modify server.ts when ssr is false', async () => {
      const tree = await buildTree();
      expect(tree.exists('/src/server.ts')).toBe(false);
    });

    it('should be a no-op when runtimeConfig is false', async () => {
      const tree = await buildTree({ ...defaultOptions, runtimeConfig: false });
      expect(tree.exists('/src/config.json')).toBe(false);
      expect(tree.exists('/proxy.conf.json')).toBe(false);
      const angularJson = JSON.parse(tree.readText('/angular.json'));
      expect(
        angularJson.projects['myapp'].architect.serve.options?.proxyConfig
      ).toBeUndefined();
    });
  });

  describe('SSR (ssr: true)', () => {
    const ssrOptions: SpartacusOptions = { ...defaultOptions, ssr: true };

    it('should not crash when server.ts is absent (graceful skip)', async () => {
      const tree = await buildTree(ssrOptions);
      // buildTree runs add-runtime-config on a plain Angular app that has no server.ts;
      // the schematic must skip server.ts patching silently without throwing
      expect(tree.exists('/src/server.ts')).toBe(false);
    });

    it('should still apply CSR wiring when ssr is true', async () => {
      const tree = await buildTree(ssrOptions);
      // CSR steps (config.json, proxy.conf.json, main.ts, app.config.ts) must not be
      // gated on !ssr — they are required regardless of SSR mode
      expect(tree.exists('/config.json')).toBe(true);
      expect(tree.exists('/proxy.conf.json')).toBe(true);
      expect(tree.readText('/src/main.ts')).toContain(
        'getRuntimeEnvironment()'
      );
      expect(tree.readText('/src/app/app.config.ts')).toContain(
        'provideRuntimeOccConfig()'
      );
    });
  });
});
