/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { UserAddressService } from '@spartacus/core';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { EMPTY, Observable, of } from 'rxjs';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { UnitAddressFormService } from './unit-address-form.service';

class MockUserAddressService implements Partial<UserAddressService> {
  getDeliveryCountries = () => of([]);
  getRegions = () => of([]);
  loadDeliveryCountries(): void {}
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  getTitles(): Observable<any[]> {
    return EMPTY;
  }
}

describe('UnitAddressFormService — enableFormFieldMaxLength', () => {
  const overLength = 'a'.repeat(257);

  const baseProviders = () => [
    UnitAddressFormService,
    { provide: UserAddressService, useClass: MockUserAddressService },
    { provide: UserProfileFacade, useClass: MockUserProfileFacade },
  ];

  describe('when enabled', () => {
    let service: UnitAddressFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ...baseProviders(),
          ...provideMockFeatureToggles({ enableFormFieldMaxLength: true }),
        ],
      });
      service = TestBed.inject(UnitAddressFormService);
    });

    it('should add maxLength validator to form fields', () => {
      const control = service.getForm()!.get('firstName')!;
      control.setValue(overLength);
      expect(control.hasError('maxlength')).toBe(true);
    });
  });

  describe('when disabled', () => {
    let service: UnitAddressFormService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          ...baseProviders(),
          ...provideMockFeatureToggles({ enableFormFieldMaxLength: false }),
        ],
      });
      service = TestBed.inject(UnitAddressFormService);
    });

    it('should not add maxLength validator to form fields', () => {
      const control = service.getForm()!.get('firstName')!;
      control.setValue(overLength);
      expect(control.hasError('maxlength')).toBe(false);
    });
  });
});
