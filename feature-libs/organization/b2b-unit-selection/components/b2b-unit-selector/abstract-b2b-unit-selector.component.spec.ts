/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { B2BUnit, OCC_USER_ID_ANONYMOUS, UserIdService } from '@spartacus/core';
import { of, throwError } from 'rxjs';
import { B2bUnitSelectionConnector } from '../../core/connectors/b2b-unit-selection.connector';
import { B2bUnitSelectionService } from '../../core/services/b2b-unit-selection.service';
import { B2bUnitSelectorStateService } from '../../core/services/b2b-unit-selector-state.service';
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
  standalone: true,
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
  loadDefaultOrgUnitName = createSpy('loadDefaultOrgUnitName').and.returnValue(
    of(mockDefaultUid)
  );
}

class MockUserIdService {
  getUserId = createSpy('getUserId').and.returnValue(of(mockUserId));
  takeUserId = createSpy('takeUserId').and.returnValue(of(mockUserId));
}

class MockB2bUnitSelectionService {
  setDefaultUnit = createSpy('setDefaultUnit');
}

describe('AbstractB2bUnitSelectorComponent', () => {
  let component: TestB2bUnitSelectorComponent;
  let fixture: ComponentFixture<TestB2bUnitSelectorComponent>;
  let stateService: MockB2bUnitSelectorStateService;
  let connector: MockB2bUnitSelectionConnector;
  let unitSelectionService: MockB2bUnitSelectionService;

  function createComponent(enabled = true, initialUnits: B2BUnit[] = []): void {
    stateService = new MockB2bUnitSelectorStateService();
    stateService.orgUnits$ = of(initialUnits);

    TestBed.configureTestingModule({
      imports: [TestB2bUnitSelectorComponent],
      providers: [
        { provide: B2bUnitSelectorStateService, useValue: stateService },
        {
          provide: B2bUnitSelectionConnector,
          useClass: MockB2bUnitSelectionConnector,
        },
        { provide: UserIdService, useClass: MockUserIdService },
        {
          provide: B2bUnitSelectionService,
          useClass: MockB2bUnitSelectionService,
        },
        {
          provide: B2bUnitSelectionConfig,
          useValue: { b2bUnitSelection: { enabled } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestB2bUnitSelectorComponent);
    component = fixture.componentInstance;
    connector = TestBed.inject(B2bUnitSelectionConnector) as any;
    unitSelectionService = TestBed.inject(B2bUnitSelectionService) as any;
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

  describe('signal initialisation when disabled', () => {
    it('should expose static empty signal for items when feature is disabled', () => {
      createComponent(false, []);
      fixture.detectChanges();

      // items() must return an empty array without subscribing to stateService.orgUnits$
      expect(component.items()).toEqual([]);
    });

    it('should expose static null signal for activeUnitName when feature is disabled', () => {
      createComponent(false, []);
      fixture.detectChanges();

      expect(component.activeUnitName()).toBeNull();
    });

    it('hasAnyUnit and hasMultipleUnits should both be false when disabled', () => {
      createComponent(false, mockUnits);
      fixture.detectChanges();

      // Even though stateService holds units, the static signal stays empty
      expect(component.hasAnyUnit()).toBeFalse();
      expect(component.hasMultipleUnits()).toBeFalse();
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

    it('should NOT throw when user is anonymous on init (page-refresh race condition)', () => {
      // Simulate page refresh: component initialises before OAuth token is restored.
      // getUserId() first emits OCC_USER_ID_ANONYMOUS, then the real userId.
      createComponent(true, []);
      const userIdService = TestBed.inject(UserIdService) as any;
      // Emit anonymous first, then the real userId — mirrors token-restore sequence.
      userIdService.getUserId.and.returnValue(
        of(OCC_USER_ID_ANONYMOUS, mockUserId)
      );

      expect(() => fixture.detectChanges()).not.toThrow();
      // The filter skips anonymous; the real userId triggers the load.
      expect(connector.loadOrgUnits).toHaveBeenCalledWith(mockUserId);
    });

    it('should set active unit to null when loadDefaultOrgUnitName fails', () => {
      createComponent(true, []);
      connector = TestBed.inject(B2bUnitSelectionConnector) as any;
      connector.loadDefaultOrgUnitName.and.returnValue(
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

    it('should call setDefaultUnit with correct payload', () => {
      component.onSelect('Rustic Services');

      expect(unitSelectionService.setDefaultUnit).toHaveBeenCalledWith(
        mockUserId,
        'Rustic Services',
        true
      );
    });
  });
});
