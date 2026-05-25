/*
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { OpfBaseRootModule } from './opf-base-root.module';
import { OpfMetadataStatePersistanceService } from './services/opf-metadata-state-persistence.service';

describe('OpfBaseRootModule', () => {
  let initSyncSpy: jasmine.Spy;

  beforeEach(() => {
    initSyncSpy = spyOn(
      OpfMetadataStatePersistanceService.prototype,
      'initSync'
    );

    TestBed.configureTestingModule({
      imports: [OpfBaseRootModule],
    });

    TestBed.inject(OpfBaseRootModule);
  });

  it('should create the module', () => {
    const module = TestBed.inject(OpfBaseRootModule);
    expect(module).toBeTruthy();
  });

  it('should call initSync on OpfMetadataStatePersistanceService during initialization', () => {
    expect(initSyncSpy).toHaveBeenCalled();
  });
});
