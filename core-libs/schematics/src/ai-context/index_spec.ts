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
import { deleteSkillDir, SkillFile, verifySkillTree } from './index';

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
    options: {
      aiTools?: string[];
      debug?: boolean;
      deleteBeforeCopy?: boolean;
    } = {},
    seed?: (tree: Tree) => void
  ): Promise<UnitTestTree> {
    const tree = Tree.empty();
    if (seed) {
      seed(tree);
    }
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

  describe('partial-update hardening', () => {
    const CLAUDE_BASE = '/.claude/skills/spartacus-developer';

    it('removes stale files on a delete+copy and verifies the result', async () => {
      const stale = `${CLAUDE_BASE}/references/OLD-STALE.md`;
      const tree = await run(
        { aiTools: ['claude'], deleteBeforeCopy: true },
        (t) => t.create(stale, '# stale, no longer shipped\n')
      );

      expect(tree.exists(stale)).toBe(false);
      expect(tree.exists(`${CLAUDE_BASE}/SKILL.md`)).toBe(true);
    });

    it('runs without throwing on the real shipped skills (integrity holds)', async () => {
      await expect(run({ aiTools: ['claude'] })).resolves.toBeDefined();
    });

    describe('verifySkillTree', () => {
      const files: SkillFile[] = [
        { relativePath: 'SKILL.md', content: 'hello' },
      ];

      it('throws when an expected file is missing', () => {
        const tree = Tree.empty();
        expect(() => verifySkillTree(tree, files, CLAUDE_BASE)).toThrow(
          /missing after copy/
        );
      });

      it('throws when a file’s content does not match', () => {
        const tree = Tree.empty();
        tree.create(`${CLAUDE_BASE}/SKILL.md`, 'TAMPERED');
        expect(() => verifySkillTree(tree, files, CLAUDE_BASE)).toThrow(
          /does not match/
        );
      });

      it('throws when an unexpected/stale file remains', () => {
        const tree = Tree.empty();
        tree.create(`${CLAUDE_BASE}/SKILL.md`, 'hello');
        tree.create(`${CLAUDE_BASE}/references/EXTRA.md`, 'surprise');
        expect(() => verifySkillTree(tree, files, CLAUDE_BASE)).toThrow(
          /unexpected file/
        );
      });

      it('passes when the tree exactly matches the manifest', () => {
        const tree = Tree.empty();
        tree.create(`${CLAUDE_BASE}/SKILL.md`, 'hello');
        expect(() => verifySkillTree(tree, files, CLAUDE_BASE)).not.toThrow();
      });
    });

    it('throws if the pre-copy delete leaves files behind', () => {
      const tree = Tree.empty();
      tree.create(
        `${CLAUDE_BASE}/SKILL.md`,
        '# will not actually be deleted\n'
      );
      // Simulate a delete that fails to remove anything.
      jest.spyOn(tree, 'delete').mockImplementation(() => undefined);

      expect(() => deleteSkillDir(tree, CLAUDE_BASE)).toThrow(
        /Failed to clear/
      );
    });
  });
});
