/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_INITIALIZER } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OpfBaseRootModule } from './opf-base-root.module';
import { OpfMetadataStatePersistanceService } from './services/opf-metadata-state-persistence.service';

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

  it('should provide APP_INITIALIZER with opfStatePersistenceFactory', () => {
    const appInitializer = TestBed.inject(APP_INITIALIZER);
    const opfStatePersistenceService = TestBed.inject(
      OpfMetadataStatePersistanceService
    );

    expect(appInitializer).toBeDefined();
    expect(appInitializer.length).toBe(1);
    const initFunction = appInitializer[0];
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
