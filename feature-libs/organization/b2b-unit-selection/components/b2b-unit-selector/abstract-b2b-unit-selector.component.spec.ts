/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { B2BUnit, UserIdService } from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { B2bUnitSelectionConnector } from '../../core/connectors/b2b-unit-selection.connector';
import { B2bUnitSelectorStateService } from '../../core/services/b2b-unit-selector-state.service';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';
import { B2bUnitSelectionConfig } from '../../root/config/b2b-unit-selection.config';
import { AbstractB2bUnitSelectorComponent } from './abstract-b2b-unit-selector.component';
import createSpy = jasmine.createSpy;

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];
const mockUserId = 'current';
const mockDefaultUid = 'Rustic';

/** Minimal concrete subclass for testing. */
@Component({
  selector: 'cx-test-selector',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestB2bUnitSelectorComponent extends AbstractB2bUnitSelectorComponent {}

class MockB2bUnitSelectorStateService {
  private _orgUnitsValue: B2BUnit[] = [];
  private _activeUnitNameValue: string | null = null;

  orgUnits$ = of(this._orgUnitsValue);
  activeUnitName$ = of(this._activeUnitNameValue);

  setOrgUnits = createSpy('setOrgUnits').and.callFake((units: B2BUnit[]) => {
    this._orgUnitsValue = units;
    this.orgUnits$ = of(units);
  });
  setActiveUnit = createSpy('setActiveUnit');
}

class MockB2bUnitSelectionConnector {
  loadOrgUnits = createSpy('loadOrgUnits').and.returnValue(of(mockUnits));
  loadDefaultOrgUnitUid = createSpy('loadDefaultOrgUnitUid').and.returnValue(
    of(mockDefaultUid)
  );
}

class MockUserIdService {
  takeUserId = createSpy('takeUserId').and.returnValue(of(mockUserId));
}

class MockStore {
  dispatch = createSpy('dispatch');
}

describe('AbstractB2bUnitSelectorComponent', () => {
  let component: TestB2bUnitSelectorComponent;
  let fixture: ComponentFixture<TestB2bUnitSelectorComponent>;
  let stateService: MockB2bUnitSelectorStateService;
  let connector: MockB2bUnitSelectionConnector;
  let store: MockStore;

  function createComponent(enabled = true, initialUnits: B2BUnit[] = []): void {
    stateService = new MockB2bUnitSelectorStateService();
    stateService.orgUnits$ = of(initialUnits);

    TestBed.configureTestingModule({
      declarations: [TestB2bUnitSelectorComponent],
      providers: [
        { provide: B2bUnitSelectorStateService, useValue: stateService },
        { provide: B2bUnitSelectionConnector, useClass: MockB2bUnitSelectionConnector },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: Store, useClass: MockStore },
        {
          provide: B2bUnitSelectionConfig,
          useValue: { b2bUnitSelection: { enabled } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestB2bUnitSelectorComponent);
    component = fixture.componentInstance;
    connector = TestBed.inject(B2bUnitSelectionConnector) as any;
    store = TestBed.inject(Store) as any;
  }

  describe('computed signals', () => {
    beforeEach(() => createComponent());

    it('hasMultipleUnits should be false when items is empty', () => {
      expect(component.hasMultipleUnits()).toBeFalse();
    });

    it('hasAnyUnit should be false when items is empty', () => {
      expect(component.hasAnyUnit()).toBeFalse();
    });
  });

  describe('ngOnInit()', () => {
    it('should NOT load units when feature is disabled', () => {
      createComponent(false, []);
      fixture.detectChanges();
      expect(connector.loadOrgUnits).not.toHaveBeenCalled();
    });

    it('should NOT load units when state already has data', () => {
      createComponent(true, mockUnits);
      fixture.detectChanges();
      expect(connector.loadOrgUnits).not.toHaveBeenCalled();
    });

    it('should load units and populate state when state is empty', () => {
      createComponent(true, []);
      fixture.detectChanges();

      expect(connector.loadOrgUnits).toHaveBeenCalledWith(mockUserId);
      expect(stateService.setOrgUnits).toHaveBeenCalledWith(mockUnits);
      expect(stateService.setActiveUnit).toHaveBeenCalledWith(mockDefaultUid);
    });

    it('should set active unit to null when loadDefaultOrgUnitUid fails', () => {
      createComponent(true, []);
      connector.loadDefaultOrgUnitUid.and.returnValue(
        throwError(() => new Error('not found'))
      );
      fixture.detectChanges();

      expect(stateService.setActiveUnit).toHaveBeenCalledWith(null);
    });
  });

  describe('onSelect()', () => {
    beforeEach(() => {
      createComponent(true, mockUnits);
      fixture.detectChanges();
    });

    it('should dispatch SetDefaultOrgUnit with correct payload', () => {
      component.onSelect('Rustic Services');

      expect(store.dispatch).toHaveBeenCalledWith(
        new SetDefaultOrgUnit({
          userId: mockUserId,
          unitUid: 'Rustic Services',
          redirectToHome: true,
        })
      );
    });
  });
});
