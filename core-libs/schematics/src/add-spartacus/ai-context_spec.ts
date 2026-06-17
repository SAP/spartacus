/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';
import { addAiContext, scheduleAiContext } from './ai-context';
import { Schema as SpartacusOptions } from './schema';

const BASE_OPTIONS: SpartacusOptions = {
  project: 'schematics-test',
  lazy: true,
  features: [],
};

const SKILLS_PACKAGE = '@spartacus/skills';

describe('addAiContext (dependency registration)', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../collection.json')
  );

  async function apply(
    options: SpartacusOptions,
    packageJson = '{}\n'
  ): Promise<UnitTestTree> {
    const tree = Tree.empty();
    tree.create('/package.json', packageJson);
    const result = await firstValueFrom(
      schematicRunner.callRule(addAiContext(options), tree)
    );
    return new UnitTestTree(result);
  }

  function devDependencies(tree: UnitTestTree): Record<string, string> {
    return JSON.parse(tree.readContent('/package.json')).devDependencies ?? {};
  }

  describe('selection handling', () => {
    it('adds no dependency when aiTools is undefined', async () => {
      const result = await apply({ ...BASE_OPTIONS });
      expect(devDependencies(result)[SKILLS_PACKAGE]).toBeUndefined();
    });

    it('adds no dependency when aiTools is empty', async () => {
      const result = await apply({ ...BASE_OPTIONS, aiTools: [] });
      expect(devDependencies(result)[SKILLS_PACKAGE]).toBeUndefined();
    });

    it('ignores unknown tool values', async () => {
      const result = await apply({
        ...BASE_OPTIONS,
        aiTools: ['bogus' as any],
      });
      expect(devDependencies(result)[SKILLS_PACKAGE]).toBeUndefined();
    });
  });

  describe('dependency registration', () => {
    it('adds @spartacus/skills to devDependencies when a tool is selected', async () => {
      const result = await apply({ ...BASE_OPTIONS, aiTools: ['claude'] });
      expect(devDependencies(result)[SKILLS_PACKAGE]).toBeDefined();
    });

    it('does not copy any skill files (copy happens post-install)', async () => {
      const result = await apply({
        ...BASE_OPTIONS,
        aiTools: ['claude', 'cursor'],
      });
      const nonPackageFiles = result.files.filter(
        (f) => f !== '/package.json'
      );
      expect(nonPackageFiles).toEqual([]);
    });

    it('does not overwrite an existing @spartacus/skills entry', async () => {
      const seeded = JSON.stringify(
        { devDependencies: { [SKILLS_PACKAGE]: '1.2.3' } },
        null,
        2
      );
      const result = await apply({ ...BASE_OPTIONS, aiTools: ['claude'] }, seeded);
      expect(devDependencies(result)[SKILLS_PACKAGE]).toEqual('1.2.3');
    });
  });
});

describe('scheduleAiContext', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../collection.json')
  );

  async function apply(options: SpartacusOptions): Promise<UnitTestTree> {
    const tree = Tree.empty();
    const result = await firstValueFrom(
      schematicRunner.callRule(scheduleAiContext(options), tree)
    );
    return new UnitTestTree(result);
  }

  it('does not modify the tree (work is deferred to a task)', async () => {
    const result = await apply({ ...BASE_OPTIONS, aiTools: ['claude'] });
    expect(result.files).toEqual([]);
  });

  it('is a no-op when no tool is selected', async () => {
    const result = await apply({ ...BASE_OPTIONS, aiTools: [] });
    expect(result.files).toEqual([]);
  });
});
