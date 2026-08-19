/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { Store } from '@ngrx/store';
import { B2BUnit, I18nTestingModule, UserIdService } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  FormErrorsModule,
  LaunchDialogService,
  NgSelectA11yDirective,
} from '@spartacus/storefront';
import { BehaviorSubject, of } from 'rxjs';
import { SetDefaultOrgUnit } from '../../core/store/actions/b2b-unit-selection.actions';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog.component';
import createSpy = jasmine.createSpy;

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];
const mockUserId = 'current';

@Directive({ selector: '[cxFocus]' })
class MockFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

@Directive({ selector: '[cxNgSelectA11y]' })
class MockNgSelectA11yDirective {
  @Input() cxNgSelectA11y: { ariaLabel?: string } = {};
}

class MockUserIdService {
  takeUserId = createSpy('takeUserId').and.returnValue(of(mockUserId));
}

class MockStore {
  dispatch = createSpy('dispatch');
}

describe('B2bUnitSelectionDialogComponent', () => {
  let component: B2bUnitSelectionDialogComponent;
  let fixture: ComponentFixture<B2bUnitSelectionDialogComponent>;
  let store: MockStore;
  let data$: BehaviorSubject<any>;

  function createComponent(dialogData: any = {}): void {
    data$ = new BehaviorSubject(dialogData);

    TestBed.configureTestingModule({
      imports: [
        B2bUnitSelectionDialogComponent,
        ReactiveFormsModule,
        NgSelectModule,
        I18nTestingModule,
        FormErrorsModule,
      ],
      providers: [
        { provide: LaunchDialogService, useValue: { data$ } },
        { provide: UserIdService, useClass: MockUserIdService },
        { provide: Store, useClass: MockStore },
      ],
    })
      .overrideComponent(B2bUnitSelectionDialogComponent, {
        remove: { imports: [FocusDirective, NgSelectA11yDirective] },
        add: {
          imports: [MockFocusDirective, MockNgSelectA11yDirective],
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(B2bUnitSelectionDialogComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as any;
  }

  // ── ngOnInit ──────────────────────────────────────────────────────────────

  describe('ngOnInit()', () => {
    it('should populate orgUnits from dialog data', waitForAsync(() => {
      createComponent({ orgUnits: mockUnits, defaultUnitName: 'unit-1' });
      fixture.detectChanges();

      expect(component.orgUnits).toEqual(mockUnits);
    }));

    it('should pre-select the unit matching defaultUnitName', waitForAsync(() => {
      createComponent({
        orgUnits: mockUnits,
        defaultUnitName: 'Rustic Services',
      });
      fixture.detectChanges();

      expect(component.form.value.selectedUnit).toEqual(mockUnits[1]);
    }));

    it('should fall back to the first unit when defaultUnitName does not match', waitForAsync(() => {
      createComponent({ orgUnits: mockUnits, defaultUnitName: 'unknown-name' });
      fixture.detectChanges();

      expect(component.form.value.selectedUnit).toEqual(mockUnits[0]);
    }));

    it('should set selectedUnit to null when orgUnits is empty', waitForAsync(() => {
      createComponent({ orgUnits: [], defaultUnitName: undefined });
      fixture.detectChanges();

      expect(component.form.value.selectedUnit).toBeNull();
    }));

    it('should handle missing dialog data gracefully', waitForAsync(() => {
      createComponent(null);
      fixture.detectChanges();

      expect(component.orgUnits).toEqual([]);
      expect(component.form.value.selectedUnit).toBeNull();
    }));
  });

  // ── confirm() ─────────────────────────────────────────────────────────────

  describe('confirm()', () => {
    beforeEach(waitForAsync(() => {
      createComponent({ orgUnits: mockUnits, defaultUnitName: 'Rustic' });
      fixture.detectChanges();
    }));

    it('should dispatch SetDefaultOrgUnit with correct payload', () => {
      component.confirm();

      expect(store.dispatch).toHaveBeenCalledWith(
        new SetDefaultOrgUnit({ userId: mockUserId, unitName: 'Rustic' })
      );
    });

    it('should mark form as touched and NOT dispatch when selectedUnit is null', () => {
      component.form.get('selectedUnit')?.setValue(null);

      component.confirm();

      expect(store.dispatch).not.toHaveBeenCalled();
      expect(component.form.get('selectedUnit')?.touched).toBeTrue();
    });
  });

  // ── ngOnDestroy ───────────────────────────────────────────────────────────

  describe('ngOnDestroy()', () => {
    it('should unsubscribe from all subscriptions', waitForAsync(() => {
      createComponent({ orgUnits: mockUnits });
      fixture.detectChanges();

      const unsubscribeSpy = spyOn(
        (component as any).subscriptions,
        'unsubscribe'
      );
      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    }));
  });
});
