/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { migrate } from './index';

interface ScheduledTask {
  toConfiguration(): {
    options: { name: string; options: { aiTools: string[] } };
  };
}

function createContext(): {
  context: SchematicContext;
  tasks: ScheduledTask[];
} {
  const tasks: ScheduledTask[] = [];
  const context = {
    addTask: (task: ScheduledTask) => {
      tasks.push(task);
      return { id: tasks.length };
    },
    logger: { info: () => undefined },
  } as unknown as SchematicContext;
  return { context, tasks };
}

describe('Refresh AI context migration', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = Tree.empty();
  });

  it('is a no-op when the project never opted into the skill', () => {
    const { context, tasks } = createContext();

    migrate()(tree, context);

    expect(tasks).toEqual([]);
  });

  it('schedules a re-copy for a project that opted into Claude', () => {
    tree.create('/.claude/skills/spartacus-developer/SKILL.md', '---\n');
    const { context, tasks } = createContext();

    migrate()(tree, context);

    expect(tasks.length).toBe(1);
    const config = tasks[0].toConfiguration();
    expect(config.options.name).toBe('ai-context');
    expect(config.options.options.aiTools).toEqual(['claude']);
  });

  it('detects both tools when both were opted into', () => {
    tree.create('/.claude/skills/spartacus-developer/SKILL.md', '---\n');
    tree.create('/.cursor/skills/spartacus-developer/SKILL.md', '---\n');
    const { context, tasks } = createContext();

    migrate()(tree, context);

    expect(tasks.length).toBe(1);
    expect(tasks[0].toConfiguration().options.options.aiTools).toEqual([
      'claude',
      'cursor',
    ]);
  });
});
