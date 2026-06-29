/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';
import * as utils from '../ai-context.utils';

const collectionPath = join(__dirname, '../../migrations.json');
const MIGRATION_SCRIPT_NAME = '00-migration-v221121_14-ai-context-prompt';
const SKILLS_PACKAGE = '@spartacus/skills';

describe('AI context prompt migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    tree = Tree.empty();
    tree.create('/package.json', '{}\n');
    runner = new SchematicTestRunner('migrations', collectionPath);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function devDependencies(t: Tree): Record<string, string> {
    const content = t.read('/package.json')?.toString('utf8') ?? '{}';
    return JSON.parse(content).devDependencies ?? {};
  }

  describe('non-interactive (CI / --force)', () => {
    it('prints the manual-opt-in notice and changes nothing', async () => {
      jest.spyOn(utils, 'isInteractiveTerminal').mockReturnValue(false);
      const noticeSpy = jest.spyOn(utils, 'printSkillsNotice');

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(noticeSpy).toHaveBeenCalled();
      expect(runner.tasks).toEqual([]);
      expect(devDependencies(newTree)[SKILLS_PACKAGE]).toBeUndefined();
    });
  });

  describe('interactive', () => {
    it('installs and copies skills when the user opts in', async () => {
      jest.spyOn(utils, 'isInteractiveTerminal').mockReturnValue(true);
      jest.spyOn(utils, 'promptYesNo').mockResolvedValue(true);
      jest.spyOn(utils, 'promptTools').mockResolvedValue(['claude']);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(devDependencies(newTree)[SKILLS_PACKAGE]).toBeDefined();
      expect(runner.tasks.some((task) => task.name === 'node-package')).toBe(
        true
      );
      expect(runner.tasks.some((task) => task.name === 'run-schematic')).toBe(
        true
      );
    });

    it('does nothing when the user declines', async () => {
      jest.spyOn(utils, 'isInteractiveTerminal').mockReturnValue(true);
      jest.spyOn(utils, 'promptYesNo').mockResolvedValue(false);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(devDependencies(newTree)[SKILLS_PACKAGE]).toBeUndefined();
      expect(runner.tasks).toEqual([]);
    });

    it('does nothing when no tools are selected', async () => {
      jest.spyOn(utils, 'isInteractiveTerminal').mockReturnValue(true);
      jest.spyOn(utils, 'promptYesNo').mockResolvedValue(true);
      jest.spyOn(utils, 'promptTools').mockResolvedValue([]);

      const newTree = await runner.runSchematic(
        MIGRATION_SCRIPT_NAME,
        {},
        tree
      );

      expect(devDependencies(newTree)[SKILLS_PACKAGE]).toBeUndefined();
      expect(runner.tasks).toEqual([]);
    });
  });
});
