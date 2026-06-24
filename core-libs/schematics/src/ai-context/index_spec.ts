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

const SKILLS_SOURCE_DIR = path.resolve(
  __dirname,
  '../../../skills/skills/spartacus-developer'
);

describe('ai-context standalone schematic', () => {
  const collection = path.join(__dirname, '../collection.json');
  const runner = new SchematicTestRunner(SPARTACUS_SCHEMATICS, collection);

  let previousEnv: string | undefined;

  beforeAll(() => {
    previousEnv = process.env.SPARTACUS_SKILLS_DIR;
    process.env.SPARTACUS_SKILLS_DIR = SKILLS_SOURCE_DIR;
  });

  afterAll(() => {
    if (previousEnv === undefined) {
      delete process.env.SPARTACUS_SKILLS_DIR;
    } else {
      process.env.SPARTACUS_SKILLS_DIR = previousEnv;
    }
  });

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

  describe('claude target', () => {
    it('copies the spartacus-developer skill into .claude/skills/', async () => {
      const tree = await run({ aiTools: ['claude'] });
      expect(tree.exists('/.claude/skills/spartacus-developer/SKILL.md')).toBe(
        true
      );
      expect(
        tree.exists(
          '/.claude/skills/spartacus-developer/references/backend-communication.md'
        )
      ).toBe(true);
    });

    it('copies the references folder', async () => {
      const tree = await run({ aiTools: ['claude'] });
      const refs = tree.files.filter((f) =>
        f.startsWith('/.claude/skills/spartacus-developer/references/')
      );
      expect(refs.length).toBeGreaterThan(0);
    });

    it('keeps the SKILL.md frontmatter so agents auto-discover it', async () => {
      const tree = await run({ aiTools: ['claude'] });
      const content = tree.readContent(
        '/.claude/skills/spartacus-developer/SKILL.md'
      );
      expect(content.startsWith('---\n')).toBe(true);
      expect(content).toContain('name: spartacus-developer');
      expect(content).toContain('description:');
    });

    it('does not write a root CLAUDE.md or AGENTS.md', async () => {
      const tree = await run({ aiTools: ['claude'] });
      expect(tree.exists('/CLAUDE.md')).toBe(false);
      expect(tree.exists('/AGENTS.md')).toBe(false);
      expect(tree.exists('/.spartacus/CLAUDE.md')).toBe(false);
    });

    it('does not touch unrelated files', async () => {
      const tree = await run({ aiTools: ['claude'] }, (t) => {
        t.create('/package.json', '{}\n');
      });
      expect(tree.readContent('/package.json')).toEqual('{}\n');
    });
  });

  describe('agents target', () => {
    it('copies the spartacus-developer skill into .agents/skills/', async () => {
      const tree = await run({ aiTools: ['agents'] });
      expect(tree.exists('/.agents/skills/spartacus-developer/SKILL.md')).toBe(
        true
      );
    });

    it('exposed via the `ai` alias', async () => {
      const tree = await runner.runSchematic(
        'ai',
        { aiTools: ['agents'] },
        Tree.empty()
      );
      expect(tree.exists('/.agents/skills/spartacus-developer/SKILL.md')).toBe(
        true
      );
    });
  });

  it('falls back gracefully when the skills package is not installed', async () => {
    const original = process.env.SPARTACUS_SKILLS_DIR;
    process.env.SPARTACUS_SKILLS_DIR = path.join(
      __dirname,
      'does-not-exist-skills'
    );
    try {
      const tree = await run({ aiTools: ['claude'] });
      expect(tree.files).toEqual([]);
    } finally {
      process.env.SPARTACUS_SKILLS_DIR = original;
    }
  });
});
