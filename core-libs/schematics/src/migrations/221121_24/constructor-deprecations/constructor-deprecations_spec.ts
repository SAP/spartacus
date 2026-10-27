/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { getSystemPath } from '@angular-devkit/core';
import { TempScopedNodeJsSyncHost } from '@angular-devkit/core/node/testing';
import { HostTree, Tree } from '@angular-devkit/schematics';
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import * as shx from 'shelljs';
import { runMigration, writeFile } from '../../../shared/utils/test-utils';

const MIGRATION_SCRIPT_NAME = 'migration-v221121_24-constructor-deprecations';

/**
 * A customer class extending a Spartacus component that was migrated to
 * inject() in Angular 22. Its super() passes exactly the deps the base used
 * to declare, so the migration should strip them from super() (and the
 * constructor params, which are only used to pass through to super()).
 */
const CUSTOMER_EXTENDS_ADD_TO_CART = `
import { ChangeDetectorRef } from '@angular/core';
import {
  AddToCartComponent,
} from '@spartacus/cart/base/components/add-to-cart';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CmsComponentData,
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { EventService } from '@spartacus/core';
export class MyAddToCart extends AddToCartComponent {
  constructor(
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    component: CmsComponentData<any>,
    eventService: EventService,
    productListItemContext: ProductListItemContext
  ) {
    super(
      currentProductService,
      cd,
      activeCartFacade,
      component,
      eventService,
      productListItemContext
    );
  }
}
`;

/**
 * A customer subclass that ALSO injects its own extra dependency, but still
 * passes exactly the base's deps to super(). The migration strips the base
 * params from super() + the constructor and KEEPS the customer's own dep.
 */
const CUSTOMER_WITH_OWN_EXTRA_DEP = `
import { ChangeDetectorRef } from '@angular/core';
import {
  AddToCartComponent,
} from '@spartacus/cart/base/components/add-to-cart';
import { ActiveCartFacade } from '@spartacus/cart/base/root';
import {
  CmsComponentData,
  CurrentProductService,
  ProductListItemContext,
} from '@spartacus/storefront';
import { EventService } from '@spartacus/core';
import { MyOwnService } from './my-own.service';
export class MyAddToCart extends AddToCartComponent {
  constructor(
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef,
    activeCartFacade: ActiveCartFacade,
    component: CmsComponentData<any>,
    eventService: EventService,
    productListItemContext: ProductListItemContext,
    protected myOwnService: MyOwnService
  ) {
    super(
      currentProductService,
      cd,
      activeCartFacade,
      component,
      eventService,
      productListItemContext
    );
  }
}
`;

/**
 * A customer subclass whose super() passes a DIFFERENT number of args than
 * the base used to declare (here: only 2). The arg count doesn't match the
 * deprecated-params fingerprint, so the migration SAFELY SKIPS it — no risky
 * auto-edit; the customer resolves it manually per the migration guide.
 */
const CUSTOMER_ARG_COUNT_MISMATCH = `
import { ChangeDetectorRef } from '@angular/core';
import {
  AddToCartComponent,
} from '@spartacus/cart/base/components/add-to-cart';
import { CurrentProductService } from '@spartacus/storefront';
export class MyAddToCart extends AddToCartComponent {
  constructor(
    currentProductService: CurrentProductService,
    cd: ChangeDetectorRef
  ) {
    super(currentProductService, cd);
  }
}
`;

const NOT_EXTENDING_SPARTACUS = `
export class Standalone {
  constructor(private foo: unknown) {}
}
`;

describe('Angular 22 inject() constructor migration (221121_24)', () => {
  let host: TempScopedNodeJsSyncHost;
  let appTree = Tree.empty() as UnitTestTree;
  let schematicRunner: SchematicTestRunner;
  let tmpDirPath: string;
  let previousWorkingDir: string;

  beforeEach(() => {
    schematicRunner = new SchematicTestRunner(
      'test',
      require.resolve('../../test/migrations-test.json')
    );
    host = new TempScopedNodeJsSyncHost();
    appTree = new UnitTestTree(new HostTree(host));

    writeFile(
      host,
      '/tsconfig.json',
      JSON.stringify({ compilerOptions: { lib: ['es2015'] } })
    );
    writeFile(
      host,
      '/angular.json',
      JSON.stringify({
        projects: {
          'spartacus-test': {
            sourceRoot: 'src',
            test: {
              architect: {
                build: { options: { tsConfig: './tsconfig.json' } },
              },
            },
          },
        },
      })
    );

    previousWorkingDir = shx.pwd();
    tmpDirPath = getSystemPath(host.root);
    shx.cd(tmpDirPath);
  });

  afterEach(() => {
    shx.cd(previousWorkingDir);
    shx.rm('-r', tmpDirPath);
  });

  it('strips super() args + constructor params when a customer extends a migrated class', async () => {
    writeFile(host, '/src/index.ts', CUSTOMER_EXTENDS_ADD_TO_CART);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    // all six pass-through params are gone from super()
    expect(content).not.toContain('currentProductService');
    expect(content).not.toContain('activeCartFacade');
    expect(content).not.toContain('productListItemContext');
    // super() is now empty
    expect(content).toMatch(/super\(\s*\)/);
  });

  it('migrates a subclass that also has its own dependency, keeping the own dep', async () => {
    writeFile(host, '/src/index.ts', CUSTOMER_WITH_OWN_EXTRA_DEP);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    // base deps stripped from super()
    expect(content).not.toContain('currentProductService');
    expect(content).not.toContain('productListItemContext');
    // customer's own dependency is preserved
    expect(content).toContain('myOwnService: MyOwnService');
    expect(content).toMatch(/super\(\s*\)/);
  });

  it('safely skips a subclass whose super() arg count does not match', async () => {
    writeFile(host, '/src/index.ts', CUSTOMER_ARG_COUNT_MISMATCH);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    // unchanged — arg count didn't match the deprecated fingerprint
    expect(content).toEqual(CUSTOMER_ARG_COUNT_MISMATCH);
  });

  it('skips classes that do not extend a Spartacus class', async () => {
    writeFile(host, '/src/index.ts', NOT_EXTENDING_SPARTACUS);

    await runMigration(appTree, schematicRunner, MIGRATION_SCRIPT_NAME);

    const content = appTree.readContent('/src/index.ts');
    expect(content).toEqual(NOT_EXTENDING_SPARTACUS);
  });
});
