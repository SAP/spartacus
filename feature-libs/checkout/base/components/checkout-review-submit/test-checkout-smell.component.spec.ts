/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCheckoutSmellComponent } from './test-checkout-smell.component';

describe('TestCheckoutSmellComponent', () => {
  let component: TestCheckoutSmellComponent;
  let fixture: ComponentFixture<TestCheckoutSmellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestCheckoutSmellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestCheckoutSmellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
