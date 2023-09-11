/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { OpfBaseRootModule } from './opf-base-root.module';
import { OpfStatePersistenceService } from './services/opf-state-persistence.service';

describe('OpfBaseRootModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OpfBaseRootModule],
    });
  });

  it('should create the module', () => {
    const module = TestBed.inject(OpfBaseRootModule);
    expect(module).toBeTruthy();
  });

  it('should provide MODULE_INITIALIZER with opfStatePersistenceFactory', () => {
    const moduleInitializer = TestBed.inject(MODULE_INITIALIZER);
    const opfStatePersistenceService = TestBed.inject(
      OpfStatePersistenceService
    );

    expect(moduleInitializer).toBeDefined();
    expect(moduleInitializer.length).toBe(1);
    const initFunction = moduleInitializer[0];
    expect(initFunction).toBeDefined();
    initFunction();

    const spyInitSync = spyOn(
      opfStatePersistenceService,
      'initSync'
    ).and.callThrough();

    initFunction();
    expect(spyInitSync).toHaveBeenCalled();
  });
});
