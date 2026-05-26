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
import { addAiContext } from './ai-context';
import { Schema as SpartacusOptions } from './schema';

const BASE_OPTIONS: SpartacusOptions = {
  project: 'schematics-test',
  lazy: true,
  features: [],
};

describe('addAiContext', () => {
  const schematicRunner = new SchematicTestRunner(
    SPARTACUS_SCHEMATICS,
    path.join(__dirname, '../collection.json')
  );

  async function apply(
    options: SpartacusOptions,
    seed?: (tree: Tree) => void
  ): Promise<UnitTestTree> {
    const tree = Tree.empty();
    if (seed) seed(tree);
    const result = await firstValueFrom(
      schematicRunner.callRule(addAiContext(options), tree)
    );
    return new UnitTestTree(result);
  }

  describe('selection handling', () => {
    it('writes nothing when aiTools is undefined', async () => {
      const result = await apply({ ...BASE_OPTIONS });
      expect(result.files).toEqual([]);
    });

    it('writes nothing when aiTools is empty', async () => {
      const result = await apply({ ...BASE_OPTIONS, aiTools: [] });
      expect(result.files).toEqual([]);
    });

    it('ignores unknown tool values', async () => {
      const result = await apply({
        ...BASE_OPTIONS,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        aiTools: ['bogus' as any],
      });
      expect(result.files).toEqual([]);
    });

    it('deduplicates repeated entries', async () => {
      const result = await apply({
        ...BASE_OPTIONS,
        aiTools: ['agents', 'agents'],
      });
      const agentsFiles = result.files.filter((f) => f.endsWith('AGENTS.md'));
      // One namespaced master + one root pointer = 2.
      expect(agentsFiles).toHaveLength(2);
    });
  });

  describe('claude target', () => {
    let result: UnitTestTree;
    beforeAll(async () => {
      result = await apply({ ...BASE_OPTIONS, aiTools: ['claude'] });
    });

    it('writes the namespaced master CLAUDE.md to .spartacus/', () => {
      expect(result.exists('/.spartacus/CLAUDE.md')).toBe(true);
    });

    it('creates .claude/CLAUDE.md (Angular convention) with an @-import to the namespaced master when neither root nor .claude file exists', () => {
      expect(result.exists('/.claude/CLAUDE.md')).toBe(true);
      expect(result.exists('/CLAUDE.md')).toBe(false);
      const content = result.read('/.claude/CLAUDE.md')!.toString('utf8');
      expect(content).toContain('<!-- spartacus-ai-context:begin -->');
      expect(content).toContain('@../.spartacus/CLAUDE.md');
      expect(content).toContain('<!-- spartacus-ai-context:end -->');
    });

    it('rewrites dot- prefixes to dot-directories in emitted paths', () => {
      const dotFiles = result.files.filter(
        (f) => f.includes('/.claude/') || f.includes('/.spartacus/')
      );
      expect(dotFiles.length).toBeGreaterThan(0);
      const stagedLeaks = result.files.filter(
        (f) => f.includes('dot-claude') || f.includes('dot-spartacus')
      );
      expect(stagedLeaks).toEqual([]);
    });

    it('emits one SKILL.md per skill folder under .claude/skills/spartacus/', () => {
      const skillFiles = result.files.filter((f) =>
        f.match(/^\/\.claude\/skills\/spartacus\/[^/]+\/SKILL\.md$/)
      );
      expect(skillFiles.length).toBeGreaterThanOrEqual(17);
    });

    it('does not place skills at the un-namespaced .claude/skills/ root', () => {
      const unnamespaced = result.files.filter((f) =>
        f.match(/^\/\.claude\/skills\/[^/]+\/SKILL\.md$/)
      );
      expect(unnamespaced).toEqual([]);
    });

    it('includes references for skills that have them', () => {
      const refs = result.files.filter((f) =>
        f.match(/^\/\.claude\/skills\/spartacus\/[^/]+\/references\/.+\.md$/)
      );
      expect(refs.length).toBeGreaterThan(0);
    });

    it('does not emit AGENTS.md or cursor rules', () => {
      expect(result.exists('/AGENTS.md')).toBe(false);
      expect(result.exists('/.spartacus/AGENTS.md')).toBe(false);
      expect(result.files.some((f) => f.includes('.cursor/'))).toBe(false);
    });

    it('preserves YAML frontmatter in each SKILL.md', () => {
      const subscriptionsSkill = result.read(
        '/.claude/skills/spartacus/subscriptions/SKILL.md'
      );
      expect(subscriptionsSkill).not.toBeNull();
      const content = subscriptionsSkill!.toString('utf8');
      expect(content.startsWith('---\n')).toBe(true);
      expect(content).toContain('name: subscriptions');
      expect(content).toContain('description:');
    });
  });

  describe('agents target', () => {
    let result: UnitTestTree;
    beforeAll(async () => {
      result = await apply({ ...BASE_OPTIONS, aiTools: ['agents'] });
    });

    it('writes the namespaced master AGENTS.md to .spartacus/', () => {
      expect(result.exists('/.spartacus/AGENTS.md')).toBe(true);
    });

    it('writes a root AGENTS.md with a sentinel-wrapped pointer', () => {
      expect(result.exists('/AGENTS.md')).toBe(true);
      const content = result.read('/AGENTS.md')!.toString('utf8');
      expect(content).toContain('<!-- spartacus-ai-context:begin -->');
      expect(content).toContain('.spartacus/AGENTS.md');
      expect(content).toContain('<!-- spartacus-ai-context:end -->');
    });

    it('AGENTS.md master contains a skills table of contents and the Quick Reference', () => {
      const content = result.read('/.spartacus/AGENTS.md')!.toString('utf8');
      expect(content).toContain('## Skills');
      expect(content).toContain('## Quick Reference');
      expect(content).toContain('## Detailed guidance');
    });

    it('AGENTS.md master strips the canonical YAML frontmatter from inlined skills', () => {
      const content = result.read('/.spartacus/AGENTS.md')!.toString('utf8');
      expect(content).not.toContain('\nname: subscriptions\n');
    });
  });

  describe('cursor target', () => {
    let result: UnitTestTree;
    beforeAll(async () => {
      result = await apply({ ...BASE_OPTIONS, aiTools: ['cursor'] });
    });

    it('emits one SKILL.md per skill folder under .cursor/skills/spartacus/', () => {
      const skillFiles = result.files.filter((f) =>
        f.match(/^\/\.cursor\/skills\/spartacus\/[^/]+\/SKILL\.md$/)
      );
      expect(skillFiles.length).toBeGreaterThanOrEqual(17);
    });

    it('includes references for skills that have them', () => {
      const refs = result.files.filter((f) =>
        f.match(/^\/\.cursor\/skills\/spartacus\/[^/]+\/references\/.+\.md$/)
      );
      expect(refs.length).toBeGreaterThan(0);
    });

    it('rewrites dot-cursor/ → .cursor/ in emitted paths', () => {
      const stagedLeaks = result.files.filter((f) => f.includes('dot-cursor'));
      expect(stagedLeaks).toEqual([]);
    });

    it('preserves canonical YAML frontmatter (name + description) in each SKILL.md', () => {
      const skill = result.read(
        '/.cursor/skills/spartacus/backend-communication/SKILL.md'
      );
      expect(skill).not.toBeNull();
      const content = skill!.toString('utf8');
      expect(content.startsWith('---\n')).toBe(true);
      expect(content).toContain('name: backend-communication');
      expect(content).toContain('description:');
      expect(content).not.toContain('alwaysApply');
    });

    it("does not touch the customer's root files when only cursor is selected", () => {
      expect(result.exists('/AGENTS.md')).toBe(false);
      expect(result.exists('/CLAUDE.md')).toBe(false);
      expect(result.exists('/.spartacus/CLAUDE.md')).toBe(false);
      expect(result.exists('/.spartacus/AGENTS.md')).toBe(false);
      expect(result.files.some((f) => f.startsWith('/.claude/'))).toBe(false);
      expect(result.files.some((f) => f.endsWith('.mdc'))).toBe(false);
    });
  });

  describe('combined selection', () => {
    let result: UnitTestTree;
    beforeAll(async () => {
      result = await apply({
        ...BASE_OPTIONS,
        aiTools: ['agents', 'claude', 'cursor'],
      });
    });

    it('emits files from all three targets', () => {
      expect(result.exists('/AGENTS.md')).toBe(true);
      expect(result.exists('/.claude/CLAUDE.md')).toBe(true);
      expect(result.exists('/.spartacus/CLAUDE.md')).toBe(true);
      expect(result.exists('/.spartacus/AGENTS.md')).toBe(true);
      expect(
        result.exists(
          '/.cursor/skills/spartacus/backend-communication/SKILL.md'
        )
      ).toBe(true);
      expect(
        result.exists(
          '/.claude/skills/spartacus/backend-communication/SKILL.md'
        )
      ).toBe(true);
    });
  });

  describe('non-destructive root-file merge', () => {
    it('preserves an existing customer CLAUDE.md and appends a sentinel block', async () => {
      const customer = '# My App\n\nProject-specific instructions.\n';
      const result = await apply(
        { ...BASE_OPTIONS, aiTools: ['claude'] },
        (tree) => tree.create('/CLAUDE.md', customer)
      );
      const content = result.read('/CLAUDE.md')!.toString('utf8');
      expect(content).toContain('Project-specific instructions.');
      expect(content).toContain('@.spartacus/CLAUDE.md');
      expect(content.indexOf('Project-specific instructions.')).toBeLessThan(
        content.indexOf('@.spartacus/CLAUDE.md')
      );
    });

    it('updates an existing sentinel block in place rather than duplicating it', async () => {
      const seeded =
        '# My App\n\nIntro.\n\n<!-- spartacus-ai-context:begin -->\nstale\n<!-- spartacus-ai-context:end -->\n';
      const result = await apply(
        { ...BASE_OPTIONS, aiTools: ['claude'] },
        (tree) => tree.create('/CLAUDE.md', seeded)
      );
      const content = result.read('/CLAUDE.md')!.toString('utf8');
      expect(content).not.toContain('stale');
      expect(content).toContain('@.spartacus/CLAUDE.md');
      const matches = content.match(/<!-- spartacus-ai-context:begin -->/g);
      expect(matches).toHaveLength(1);
    });

    it('is idempotent across repeated applications', async () => {
      const tree = Tree.empty();
      const once = new UnitTestTree(
        await firstValueFrom(
          schematicRunner.callRule(
            addAiContext({ ...BASE_OPTIONS, aiTools: ['claude'] }),
            tree
          )
        )
      );
      const twice = new UnitTestTree(
        await firstValueFrom(
          schematicRunner.callRule(
            addAiContext({ ...BASE_OPTIONS, aiTools: ['claude'] }),
            once
          )
        )
      );
      const onceContent = once.read('/.claude/CLAUDE.md')!.toString('utf8');
      const twiceContent = twice.read('/.claude/CLAUDE.md')!.toString('utf8');
      expect(twiceContent).toEqual(onceContent);
    });
  });

  describe('claude target — Angular ai-config interop', () => {
    it('merges into an existing /.claude/CLAUDE.md (created by ng generate ai-config --tool=claude) using a parent-relative @-import', async () => {
      const angularGuidance =
        '# Angular best practices\n\nUse standalone components, signals, and OnPush.\n';
      const result = await apply(
        { ...BASE_OPTIONS, aiTools: ['claude'] },
        (tree) => tree.create('/.claude/CLAUDE.md', angularGuidance)
      );
      expect(result.exists('/CLAUDE.md')).toBe(false);
      const content = result.read('/.claude/CLAUDE.md')!.toString('utf8');
      expect(content).toContain('Use standalone components');
      expect(content).toContain('<!-- spartacus-ai-context:begin -->');
      expect(content).toContain('@../.spartacus/CLAUDE.md');
      expect(content).toContain('<!-- spartacus-ai-context:end -->');
      expect(content.indexOf('Use standalone components')).toBeLessThan(
        content.indexOf('@../.spartacus/CLAUDE.md')
      );
    });

    it('prefers /CLAUDE.md when both /CLAUDE.md and /.claude/CLAUDE.md exist, and leaves /.claude/CLAUDE.md untouched', async () => {
      const angularGuidance =
        '# Angular best practices\n\nUse standalone components.\n';
      const customerRoot = '# My App\n\nProject-specific instructions.\n';
      const result = await apply(
        { ...BASE_OPTIONS, aiTools: ['claude'] },
        (tree) => {
          tree.create('/.claude/CLAUDE.md', angularGuidance);
          tree.create('/CLAUDE.md', customerRoot);
        }
      );

      const root = result.read('/CLAUDE.md')!.toString('utf8');
      expect(root).toContain('Project-specific instructions.');
      expect(root).toContain('@.spartacus/CLAUDE.md');
      expect(root).not.toContain('@../.spartacus/CLAUDE.md');

      const dot = result.read('/.claude/CLAUDE.md')!.toString('utf8');
      expect(dot).toEqual(angularGuidance);
      expect(dot).not.toContain('spartacus-ai-context');
    });

    it('updates an existing sentinel block inside /.claude/CLAUDE.md in place rather than duplicating it', async () => {
      const seeded =
        '# Angular best practices\n\nIntro.\n\n<!-- spartacus-ai-context:begin -->\nstale\n<!-- spartacus-ai-context:end -->\n';
      const result = await apply(
        { ...BASE_OPTIONS, aiTools: ['claude'] },
        (tree) => tree.create('/.claude/CLAUDE.md', seeded)
      );
      const content = result.read('/.claude/CLAUDE.md')!.toString('utf8');
      expect(content).not.toContain('stale');
      expect(content).toContain('@../.spartacus/CLAUDE.md');
      const matches = content.match(/<!-- spartacus-ai-context:begin -->/g);
      expect(matches).toHaveLength(1);
    });
  });
});
