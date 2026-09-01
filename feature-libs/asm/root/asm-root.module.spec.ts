/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ROUTES, Route, RouterModule } from '@angular/router';
import {
  FeatureModulesService,
  HOME_PAGE_CONTEXT,
  PageType,
  RoutingConfig,
  WindowRef,
} from '@spartacus/core';
import { LaunchDialogService } from '@spartacus/storefront';
import { of } from 'rxjs';
import { AsmRootModule } from './asm-root.module';

const store: Record<string, string> = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string | null => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string): void => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
  },
};

class MockLocation {
  path() {
    return '';
  }
}

class MockLaunchDialogService {
  launch() {}
}

class MockFeatureModulesService {
  resolveFeature() {
    return of(undefined);
  }
}

describe('AsmRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), AsmRootModule],
      providers: [
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: Location, useClass: MockLocation },
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: FeatureModulesService, useClass: MockFeatureModulesService },
      ],
    });
  });

  it('should register ASM deep link route with homepage CMS context', () => {
    const routes = TestBed.inject<Route[][]>(ROUTES).flat();
    const deepLinkRoute = routes.find(
      (route) => route.data?.cxRoute === 'asmDeepLink'
    );

    expect(deepLinkRoute?.data?.cxCmsRouteContext).toEqual({
      id: HOME_PAGE_CONTEXT,
      type: PageType.CONTENT_PAGE,
    });
  });

  it('should configure ASM deep link path', () => {
    const routingConfig = TestBed.inject(RoutingConfig, null);

    expect(routingConfig?.routing?.routes?.asmDeepLink?.paths).toEqual([
      'assisted-service/emulate',
    ]);
  });
});
