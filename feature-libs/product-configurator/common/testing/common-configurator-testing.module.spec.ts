/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConfiguratorRouterExtractorService } from '../components/service/configurator-router-extractor.service';
import { CommonConfiguratorUtilsService } from '../shared/utils/common-configurator-utils.service';
import { CommonConfiguratorTestingModule } from './common-configurator-testing.module';
import { MockCommonConfiguratorUtilsService } from './services/mock-common-configurator-utils.service';
import { MockConfiguratorRouterExtractorService } from './services/mock-configurator-router-extractor.service';

describe('CommonConfiguratorTestingModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonConfiguratorTestingModule],
    });
  });

  it('should provide mock common services', () => {
    expect(TestBed.inject(CommonConfiguratorUtilsService)).toBeInstanceOf(
      MockCommonConfiguratorUtilsService
    );
    expect(TestBed.inject(ConfiguratorRouterExtractorService)).toBeInstanceOf(
      MockConfiguratorRouterExtractorService
    );
  });

  it('should expose documented defaults', () => {
    const utils = TestBed.inject(CommonConfiguratorUtilsService);
    expect(utils.decomposeOwnerId('doc+1')).toEqual({
      documentId: 'doc',
      entryNumber: '1',
    });
    expect(utils.isAttributeBasedConfigurator('x')).toBe(true);
  });

  it('should allow overriding a method with vi.spyOn', () => {
    const utils = TestBed.inject(CommonConfiguratorUtilsService);
    vi.spyOn(utils, 'isActiveCartContext').mockReturnValue(of(true));
    expect(utils.isActiveCartContext(undefined as any)).toBeTruthy();
  });
});
