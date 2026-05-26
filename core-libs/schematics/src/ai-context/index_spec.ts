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
import { SPARTACUS_SCHEMATICS } from '../shared/libs-constants';

describe('ai-context standalone schematic', () => {
  const collection = path.join(__dirname, '../collection.json');
  const runner = new SchematicTestRunner(SPARTACUS_SCHEMATICS, collection);

  async function run(
    options: { aiTools?: string[]; debug?: boolean } = {},
    seed?: (tree: Tree) => void
  ): Promise<UnitTestTree> {
    const tree = Tree.empty();
    if (seed) seed(tree);
    return runner.runSchematic('ai-context', options, tree);
  }

  it('writes nothing when aiTools is empty', async () => {
    const tree = await run({ aiTools: [] });
    expect(tree.files).toEqual([]);
  });

  it('retrofits Claude into an existing app without touching unrelated files', async () => {
    const tree = await run({ aiTools: ['claude'] }, (t) => {
      t.create('/package.json', '{}\n');
      t.create('/CLAUDE.md', '# My App\n\nMy notes.\n');
    });

    expect(tree.exists('/.spartacus/CLAUDE.md')).toBe(true);
    expect(
      tree.exists('/.claude/skills/spartacus/backend-communication/SKILL.md')
    ).toBe(true);

    expect(tree.read('/package.json')!.toString('utf8')).toEqual('{}\n');

    const claudeMd = tree.read('/CLAUDE.md')!.toString('utf8');
    expect(claudeMd).toContain('My notes.');
    expect(claudeMd).toContain('@.spartacus/CLAUDE.md');
  });

  it('exposed via the `ai` alias', async () => {
    const tree = await runner.runSchematic(
      'ai',
      { aiTools: ['cursor'] },
      Tree.empty()
    );
    expect(
      tree.exists('/.cursor/skills/spartacus/backend-communication/SKILL.md')
    ).toBe(true);
  });
});
