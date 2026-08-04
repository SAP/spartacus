/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChangeDetectionStrategy, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { B2BUnit, I18nTestingModule } from '@spartacus/core';
import {
  FocusConfig,
  FocusDirective,
  FormErrorsModule,
  LaunchDialogService,
  NgSelectA11yDirective,
} from '@spartacus/storefront';
import { BehaviorSubject } from 'rxjs';
import { B2bUnitSelectionDialogComponent } from './b2b-unit-selection-dialog.component';
import createSpy = jasmine.createSpy;

const mockUnits: B2BUnit[] = [
  { uid: 'unit-1', name: 'Rustic' },
  { uid: 'unit-2', name: 'Rustic Services' },
];

@Directive({ selector: '[cxFocus]' })
class MockFocusDirective {
  @Input('cxFocus') config: FocusConfig = {};
}

@Directive({ selector: '[cxNgSelectA11y]' })
class MockNgSelectA11yDirective {
  @Input() cxNgSelectA11y: { ariaLabel?: string } = {};
}

describe('B2bUnitSelectionDialogComponent', () => {
  let component: B2bUnitSelectionDialogComponent;
  let fixture: ComponentFixture<B2bUnitSelectionDialogComponent>;
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
      providers: [{ provide: LaunchDialogService, useValue: { data$ } }],
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

    it('should store the onConfirm callback from dialog data', waitForAsync(() => {
      const onConfirm = createSpy('onConfirm');
      createComponent({
        orgUnits: mockUnits,
        defaultUnitName: 'Rustic',
        onConfirm,
      });
      fixture.detectChanges();

      expect((component as any).onConfirm).toBe(onConfirm);
    }));
  });

  // ── confirm() ─────────────────────────────────────────────────────────────

  describe('confirm()', () => {
    let onConfirm: jasmine.Spy;

    beforeEach(waitForAsync(() => {
      onConfirm = createSpy('onConfirm');
      createComponent({
        orgUnits: mockUnits,
        defaultUnitName: 'Rustic',
        onConfirm,
      });
      fixture.detectChanges();
    }));

    it('should invoke the onConfirm callback with the selected unit name', () => {
      component.confirm();

      expect(onConfirm).toHaveBeenCalledWith('Rustic');
    });

    it('should mark form as touched and NOT invoke onConfirm when selectedUnit is null', () => {
      component.form.get('selectedUnit')?.setValue(null);

      component.confirm();

      expect(onConfirm).not.toHaveBeenCalled();
      expect(component.form.get('selectedUnit')?.touched).toBeTrue();
    });

    it('should NOT throw when onConfirm is not provided', () => {
      // Re-create without onConfirm in data payload.
      TestBed.resetTestingModule();
      createComponent({ orgUnits: mockUnits, defaultUnitName: 'Rustic' });
      fixture.detectChanges();

      expect(() => component.confirm()).not.toThrow();
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
