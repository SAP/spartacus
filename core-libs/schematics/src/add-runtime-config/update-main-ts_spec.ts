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
import { updateMainTs } from './update-main-ts';

const collectionPath = path.join(__dirname, '../collection.json');

describe('updateMainTs (runtime config)', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    collectionPath
  );

  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };

  const appOptions: ApplicationOptions = {
    name: 'main-ts-test',
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
    project: 'main-ts-test',
    baseSite: 'electronics',
    baseUrl: 'https://localhost:9002',
    lazy: true,
    features: [],
    runtimeConfig: true,
  };

  const mainTsContent = `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
`;

  async function buildTree(
    mainTsOverride: string = mainTsContent
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
    appTree.overwrite('/src/main.ts', mainTsOverride);
    return (await firstValueFrom(
      schematicRunner.callRule(updateMainTs(defaultOptions), appTree)
    )) as UnitTestTree;
  }

  it('should wrap bootstrapApplication with getRuntimeEnvironment().then()', async () => {
    const tree = await buildTree();
    const main = tree.readText('/src/main.ts');
    expect(main).toContain('getRuntimeEnvironment()');
    expect(main).toContain('RUNTIME_ENVIRONMENT');
    expect(main).toContain('@spartacus/setup');
    expect(main).toMatchSnapshot();
  });

  it('should be idempotent — not re-wrap if getRuntimeEnvironment already present', async () => {
    const alreadyWrapped = `import { getRuntimeEnvironment, RUNTIME_ENVIRONMENT } from '@spartacus/setup';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

getRuntimeEnvironment()
  .then(({ runtimeEnvironment }) => {
    return bootstrapApplication(AppComponent, {
      ...appConfig,
      providers: [
        { provide: RUNTIME_ENVIRONMENT, useValue: runtimeEnvironment },
        ...(appConfig.providers ?? []),
      ],
    });
  })
  .catch((err) => console.error(err));
`;
    const tree = await buildTree(alreadyWrapped);
    const main = tree.readText('/src/main.ts');
    // File should be unchanged — exactly as provided (guard prevented re-wrapping)
    expect(main).toBe(alreadyWrapped);
  });
});
