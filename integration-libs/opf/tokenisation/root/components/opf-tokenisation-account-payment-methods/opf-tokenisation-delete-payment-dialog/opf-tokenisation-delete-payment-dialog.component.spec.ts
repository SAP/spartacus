/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  I18nTestingModule,
  MockTranslatePipe,
  TranslatePipe,
} from '@spartacus/core';
import { OpfTokenisationDeletePaymentDialogComponent } from './opf-tokenisation-delete-payment-dialog.component';

describe('OpfTokenisationDeletePaymentDialogComponent', () => {
  let component: OpfTokenisationDeletePaymentDialogComponent;
  let fixture: ComponentFixture<OpfTokenisationDeletePaymentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpfTokenisationDeletePaymentDialogComponent, I18nTestingModule],
    })
      .overrideComponent(OpfTokenisationDeletePaymentDialogComponent, {
        remove: { imports: [TranslatePipe] },
        add: { imports: [MockTranslatePipe] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(
      OpfTokenisationDeletePaymentDialogComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show dialog by default', () => {
    expect(component.showDialog).toBe(false);
  });

  describe('onConfirm', () => {
    it('should emit confirm event', () => {
      spyOn(component.confirmDelete, 'emit');
      component.onConfirm();
      expect(component.confirmDelete.emit).toHaveBeenCalled();
    });
  });

  describe('onCancel', () => {
    it('should emit cancel event', () => {
      spyOn(component.cancelDelete, 'emit');
      component.onCancel();
      expect(component.cancelDelete.emit).toHaveBeenCalled();
    });
  });
});
