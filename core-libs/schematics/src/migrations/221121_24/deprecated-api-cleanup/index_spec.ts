/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import { join } from 'path';

describe('Deprecated API cleanup migration', () => {
  it('reports removed API usage and EPD retirement while preserving feature toggles', async () => {
    const tree = Tree.empty();
    tree.create(
      '/angular.json',
      JSON.stringify({
        version: 1,
        projects: {
          app: {
            root: '',
            sourceRoot: 'src',
            projectType: 'application',
            architect: {},
          },
        },
      })
    );
    const source = `
import { layoutConfig } from '@spartacus/storefront';
import { provideFeatureToggles } from '@spartacus/core';
import { CartItemListComponent } from '@spartacus/cart/base/components';
import { EpdVisualizationModule } from '@spartacus/epd-visualization';
class CustomCart extends CartItemListComponent {
  update() { this.setLoading = true; }
}
provideFeatureToggles({ productConfiguratorCPQContainer: false });
`;
    tree.create('/src/app.ts', source);
    const runner = new SchematicTestRunner(
      'migrations',
      join(__dirname, '../../migrations.json')
    );
    const result = await runner.runSchematic(
      '12-migration-v221121_24-deprecated-api-cleanup',
      {},
      tree
    );
    const migrated = result.readText('/src/app.ts');
    expect(migrated).toContain('layoutConfigFactory');
    expect(migrated).toContain('cartIsLoading');
    expect(migrated).toContain('EPD Visualization was retired');
    expect(migrated).toContain(
      'provideFeatureToggles({ productConfiguratorCPQContainer: false });'
    );
    expect(migrated).toContain('this.setLoading = true');
  });
});
