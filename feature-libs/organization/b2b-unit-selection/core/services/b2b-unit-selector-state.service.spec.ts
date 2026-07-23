/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { B2BUnit } from '@spartacus/core';
import { B2bUnitSelectorStateService } from './b2b-unit-selector-state.service';

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];

describe('B2bUnitSelectorStateService', () => {
  let service: B2bUnitSelectorStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(B2bUnitSelectorStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('orgUnits$', () => {
    it('should emit an empty array as initial value', (done) => {
      service.orgUnits$.subscribe((units) => {
        expect(units).toEqual([]);
        done();
      });
    });

    it('should emit the updated list after setOrgUnits()', (done) => {
      service.setOrgUnits(mockUnits);
      service.orgUnits$.subscribe((units) => {
        expect(units).toEqual(mockUnits);
        done();
      });
    });

    it('should emit an empty array when reset via setOrgUnits([])', (done) => {
      service.setOrgUnits(mockUnits);
      service.setOrgUnits([]);
      service.orgUnits$.subscribe((units) => {
        expect(units).toEqual([]);
        done();
      });
    });
  });

  describe('activeUnitName$', () => {
    it('should emit null as initial value', (done) => {
      service.activeUnitName$.subscribe((name) => {
        expect(name).toBeNull();
        done();
      });
    });

    it('should emit the updated name after setActiveUnit()', (done) => {
      service.setActiveUnit('Rustic');
      service.activeUnitName$.subscribe((name) => {
        expect(name).toBe('Rustic');
        done();
      });
    });

    it('should emit null when reset via setActiveUnit(null)', (done) => {
      service.setActiveUnit('Rustic');
      service.setActiveUnit(null);
      service.activeUnitName$.subscribe((name) => {
        expect(name).toBeNull();
        done();
      });
    });
  });
});
