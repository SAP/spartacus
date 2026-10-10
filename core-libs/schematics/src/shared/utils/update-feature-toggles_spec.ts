/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { firstValueFrom } from 'rxjs';
import { migrate } from './update-feature-toggles';

// The migrate() Rule is called directly so tests don't depend on migrations.json
// having an entry committed at test time (entries are generated at release time).
const RUNNER_COLLECTION = path.join(__dirname, '../../collection.json');

const INTERFACE_FILE = 'node_modules/@spartacus/core/types/spartacus-core.d.ts';
const MODULE_FILE = 'src/app/spartacus/spartacus-features.module.ts';

/**
 * Helper: builds a fake FeatureTogglesInterface declaration with the given toggle names.
 */
function buildInterfaceFile(validToggles: string[]): string {
  const props = validToggles.map((name) => `    ${name}?: boolean;`).join('\n');
  return `
export declare interface SomeOtherInterface {
    foo: string;
}

interface FeatureTogglesInterface {
${props}
}

export declare type FeatureToggles = FeatureTogglesInterface;
`;
}

/**
 * Helper: builds a spartacus-features module that uses the given toggle names.
 */
function buildModuleFile(toggles: Record<string, boolean>): string {
  const entries = Object.entries(toggles)
    .map(([key, value]) => `      "${key}": ${value},`)
    .join('\n');
  return `import { NgModule } from '@angular/core';
import { provideFeatureToggles } from '@spartacus/core';

@NgModule({
  providers: [
    provideFeatureToggles({
${entries}
    })
  ]
})
export class SpartacusFeaturesModule {}
`;
}

async function runMigration(tree: Tree): Promise<Tree> {
  const runner = new SchematicTestRunner('migrations', RUNNER_COLLECTION);
  return firstValueFrom(runner.callRule(migrate(), tree));
}

describe('Update feature toggles migration', () => {
  it('should comment out unknown toggles with [REMOVED] marker', async () => {
    const tree = Tree.empty();
    // Interface declares only toggleA and toggleB as valid
    tree.create(INTERFACE_FILE, buildInterfaceFile(['toggleA', 'toggleB']));

    // Module uses toggleA, toggleB (valid) and toggleOld, toggleRemoved (unknown)
    tree.create(
      MODULE_FILE,
      buildModuleFile({
        toggleA: true,
        toggleB: true,
        toggleOld: true,
        toggleRemoved: true,
      })
    );

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);

    // Valid toggles should remain uncommented
    expect(content).toContain('"toggleA": true,');
    expect(content).toContain('"toggleB": true,');

    // Unknown toggles should be commented out with [REMOVED]
    expect(content).toContain('// [REMOVED]');
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleOld": true,/);
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleRemoved": true,/);

    // The commented lines should NOT be active code
    expect(content).not.toMatch(/^\s+"toggleOld"/m);
    expect(content).not.toMatch(/^\s+"toggleRemoved"/m);
  });

  it('should not modify the file when all toggles are valid', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['toggleA', 'toggleB']));

    const moduleContent = buildModuleFile({
      toggleA: true,
      toggleB: true,
    });
    tree.create(MODULE_FILE, moduleContent);

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);

    // Should be unchanged — no unknown toggles to remove
    expect(content).toBe(moduleContent);
    expect(content).not.toContain('// [REMOVED]');
  });

  it('should not modify the file when module has fewer toggles than interface', async () => {
    const tree = Tree.empty();
    // Interface has more toggles than the module — but that's fine, no action needed
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA', 'toggleB', 'toggleNew1', 'toggleNew2'])
    );

    const moduleContent = buildModuleFile({
      toggleA: true,
      toggleB: true,
    });
    tree.create(MODULE_FILE, moduleContent);

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);

    // Should be unchanged — missing toggles are NOT added
    expect(content).toBe(moduleContent);
    expect(content).not.toContain('// [REMOVED]');
  });

  it('should comment out ALL unknown toggles when none are valid', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['newToggle']));

    tree.create(
      MODULE_FILE,
      buildModuleFile({
        oldToggle1: true,
        oldToggle2: true,
      })
    );

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);
    expect(content).toMatch(/\/\/ \[REMOVED].*"oldToggle1"/);
    expect(content).toMatch(/\/\/ \[REMOVED].*"oldToggle2"/);
  });

  it('should preserve indentation when commenting out', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['validToggle']));

    tree.create(
      MODULE_FILE,
      buildModuleFile({
        validToggle: true,
        removedToggle: true,
      })
    );

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);
    // The commented line should have the same indentation level as valid lines
    const validLine = content
      .split('\n')
      .find((l) => l.includes('"validToggle"'));
    const commentedLine = content
      .split('\n')
      .find((l) => l.includes('"removedToggle"'));

    expect(validLine).toBeTruthy();
    expect(commentedLine).toBeTruthy();

    const validIndent = validLine?.match(/^(\s*)/)?.[1].length ?? 0;
    const commentedIndent = commentedLine?.match(/^(\s*)/)?.[1].length ?? 0;
    expect(commentedIndent).toBe(validIndent);
  });

  it('should skip gracefully when interface file is missing', async () => {
    const tree = Tree.empty();
    tree.create(MODULE_FILE, buildModuleFile({ toggleA: true }));

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);
    expect(content).toContain('"toggleA": true,');
    expect(content).not.toContain('// [REMOVED]');
  });

  it('should skip gracefully when module file is missing', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['toggleA']));

    const newTree = await runMigration(tree);
    expect(newTree).toBeTruthy();
  });

  it('should skip gracefully when no provideFeatureToggles call exists', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['toggleA']));

    tree.create(
      MODULE_FILE,
      `import { NgModule } from '@angular/core';
@NgModule({})
export class SpartacusFeaturesModule {}
`
    );

    const newTree = await runMigration(tree);
    const content = newTree.readText(MODULE_FILE);
    expect(content).not.toContain('// [REMOVED]');
  });

  it('should find the module file in alternative locations', async () => {
    const tree = Tree.empty();
    tree.create(INTERFACE_FILE, buildInterfaceFile(['toggleA']));

    const altPath = 'src/app/spartacus-features.module.ts';
    tree.create(
      altPath,
      buildModuleFile({
        toggleA: true,
        toggleOld: true,
      })
    );

    const newTree = await runMigration(tree);
    const content = newTree.readText(altPath);
    expect(content).toContain('"toggleA": true,');
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleOld"/);
  });
});
