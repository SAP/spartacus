/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

const collectionPath = join(__dirname, '../../migrations/migrations.json');
const MIGRATION_SCRIPT_NAME = '00-migration-v221121_9-update-feature-toggles';

const INTERFACE_FILE =
  'node_modules/@spartacus/core/types/spartacus-core.d.ts';
const MODULE_FILE = 'src/app/spartacus/spartacus-features.module.ts';

/**
 * Helper: builds a fake FeatureTogglesInterface declaration with the given toggle names.
 */
function buildInterfaceFile(validToggles: string[]): string {
  const props = validToggles
    .map((name) => `    ${name}?: boolean;`)
    .join('\n');
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

describe('Update feature toggles migration', () => {
  let tree: Tree;
  let runner: SchematicTestRunner;

  beforeEach(() => {
    tree = Tree.empty();
    runner = new SchematicTestRunner('migrations', collectionPath);
  });

  it('should comment out unknown toggles with [REMOVED] marker', async () => {
    // Interface declares only toggleA and toggleB as valid
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA', 'toggleB'])
    );

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

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

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

  it('should not modify the file when all toggles match exactly', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA', 'toggleB'])
    );

    const moduleContent = buildModuleFile({
      toggleA: true,
      toggleB: true,
    });
    tree.create(MODULE_FILE, moduleContent);

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);

    // Should be unchanged — no unknown toggles to remove, no new ones to add
    expect(content).toBe(moduleContent);
    expect(content).not.toContain('// [REMOVED]');
    expect(content).not.toContain('// [NEW]');
  });

  it('should add missing (new) toggles with value true', async () => {
    // Interface declares toggleA, toggleB, toggleNew1, toggleNew2
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA', 'toggleB', 'toggleNew1', 'toggleNew2'])
    );

    // Module only has toggleA and toggleB (missing toggleNew1, toggleNew2)
    tree.create(
      MODULE_FILE,
      buildModuleFile({
        toggleA: true,
        toggleB: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);

    // Existing toggles should remain
    expect(content).toContain('"toggleA": true,');
    expect(content).toContain('"toggleB": true,');

    // New toggles should be added with value true and [NEW] marker
    expect(content).toContain('"toggleNew1": true, // [NEW]');
    expect(content).toContain('"toggleNew2": true, // [NEW]');

    // No removed-toggle comments
    expect(content).not.toContain('// [REMOVED]');
  });

  it('should both comment out unknown and add missing toggles in one run', async () => {
    // Interface declares toggleA and toggleNew
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA', 'toggleNew'])
    );

    // Module has toggleA (valid), toggleOld (unknown), but not toggleNew (missing)
    tree.create(
      MODULE_FILE,
      buildModuleFile({
        toggleA: true,
        toggleOld: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);

    // toggleA should remain
    expect(content).toContain('"toggleA": true,');

    // toggleOld should be commented out
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleOld": true,/);
    expect(content).not.toMatch(/^\s+"toggleOld"/m);

    // toggleNew should be added with [NEW] marker
    expect(content).toContain('"toggleNew": true, // [NEW]');
  });

  it('should not re-add a toggle that was just commented out', async () => {
    // Interface declares only toggleA (toggleOld was removed)
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA'])
    );

    // Module has both — toggleOld will be commented out
    tree.create(
      MODULE_FILE,
      buildModuleFile({
        toggleA: true,
        toggleOld: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);

    // toggleOld should be commented out
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleOld"/);

    // toggleOld should NOT appear as an active uncommented entry
    const activeToggles = content.match(/^\s+"(\w+)"\s*:/gm) || [];
    const activeToggleNames = activeToggles.map((l) => {
      const m = l.match(/"(\w+)"/);
      return m ? m[1] : '';
    });
    expect(activeToggleNames).not.toContain('toggleOld');
  });

  it('should add new toggles sorted alphabetically', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['existing', 'charlie', 'alpha', 'bravo'])
    );

    tree.create(
      MODULE_FILE,
      buildModuleFile({ existing: true })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);

    // All new toggles should be present
    expect(content).toContain('"alpha": true,');
    expect(content).toContain('"bravo": true,');
    expect(content).toContain('"charlie": true,');

    // Verify alphabetical order
    const alphaIdx = content.indexOf('"alpha"');
    const bravoIdx = content.indexOf('"bravo"');
    const charlieIdx = content.indexOf('"charlie"');
    expect(alphaIdx).toBeLessThan(bravoIdx);
    expect(bravoIdx).toBeLessThan(charlieIdx);
  });

  it('should skip gracefully when interface file is missing', async () => {
    // No INTERFACE_FILE created
    tree.create(
      MODULE_FILE,
      buildModuleFile({ toggleA: true })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    // Module file should be unchanged
    const content = newTree.readText(MODULE_FILE);
    expect(content).toContain('"toggleA": true,');
    expect(content).not.toContain('// [REMOVED]');
    expect(content).not.toContain('// [NEW]');
  });

  it('should skip gracefully when module file is missing', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA'])
    );
    // No MODULE_FILE created

    // Should not throw
    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    expect(newTree).toBeTruthy();
  });

  it('should skip gracefully when no provideFeatureToggles call exists', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA'])
    );

    tree.create(
      MODULE_FILE,
      `import { NgModule } from '@angular/core';
@NgModule({})
export class SpartacusFeaturesModule {}
`
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);
    expect(content).not.toContain('// [REMOVED]');
    expect(content).not.toContain('// [NEW]');
  });

  it('should comment out ALL unknown toggles and add new ones when none are valid', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['newToggle'])
    );

    tree.create(
      MODULE_FILE,
      buildModuleFile({
        oldToggle1: true,
        oldToggle2: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(MODULE_FILE);
    expect(content).toMatch(/\/\/ \[REMOVED].*"oldToggle1"/);
    expect(content).toMatch(/\/\/ \[REMOVED].*"oldToggle2"/);

    // newToggle should be added since it's in the interface but not in the module
    expect(content).toContain('"newToggle": true, // [NEW]');
  });

  it('should preserve indentation when commenting out', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['validToggle'])
    );

    tree.create(
      MODULE_FILE,
      buildModuleFile({
        validToggle: true,
        removedToggle: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

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

    const validIndent = validLine!.match(/^(\s*)/)?.[1].length ?? 0;
    const commentedIndent = commentedLine!.match(/^(\s*)/)?.[1].length ?? 0;
    expect(commentedIndent).toBe(validIndent);
  });

  it('should find the module file in alternative locations', async () => {
    tree.create(
      INTERFACE_FILE,
      buildInterfaceFile(['toggleA'])
    );

    // Put module in a non-standard location
    const altPath = 'src/app/spartacus-features.module.ts';
    tree.create(
      altPath,
      buildModuleFile({
        toggleA: true,
        toggleOld: true,
      })
    );

    const newTree = await runner.runSchematic(
      MIGRATION_SCRIPT_NAME,
      {},
      tree
    );

    const content = newTree.readText(altPath);
    expect(content).toContain('"toggleA": true,');
    expect(content).toMatch(/\/\/ \[REMOVED].*"toggleOld"/);
  });
});

