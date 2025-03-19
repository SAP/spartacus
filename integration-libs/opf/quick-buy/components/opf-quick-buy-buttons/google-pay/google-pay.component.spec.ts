/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpfGooglePayComponent } from './google-pay.component';
import { OpfGooglePayService } from './google-pay.service';

class MockOpfGooglePayService {
  loadResources = jasmine.createSpy().and.returnValue(Promise.resolve());
  initClient = jasmine.createSpy();
  isReadyToPay = jasmine
    .createSpy()
    .and.returnValue(Promise.resolve({ result: true }));
  renderPaymentButton = jasmine.createSpy();
}

describe('OpfGooglePayComponent', () => {
  let component: OpfGooglePayComponent;
  let fixture: ComponentFixture<OpfGooglePayComponent>;
  let mockOpfGooglePayService: MockOpfGooglePayService;
  let mockChangeDetectorRef: jasmine.SpyObj<ChangeDetectorRef>;

  beforeEach(async () => {
    mockChangeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', [
      'detectChanges',
    ]);
    mockOpfGooglePayService = new MockOpfGooglePayService();

    TestBed.configureTestingModule({
      declarations: [OpfGooglePayComponent],
      providers: [
        { provide: OpfGooglePayService, useValue: mockOpfGooglePayService },
        { provide: ChangeDetectorRef, useValue: mockChangeDetectorRef },
      ],
    })
      .overrideComponent(OpfGooglePayComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OpfGooglePayComponent);
    component = fixture.componentInstance;
    component.activeConfiguration = {};
  });

  async function detectChanges() {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize Google Pay client on init', async () => {
    await detectChanges();

    expect(mockOpfGooglePayService.loadResources).toHaveBeenCalled();
    expect(mockOpfGooglePayService.initClient).toHaveBeenCalledWith(
      component.activeConfiguration
    );
  });

  it('should update ready to pay state when Google Pay is ready', async () => {
    await detectChanges();

    expect(component.isReadyToPayState$.getValue()).toBe(true);
  });

  it('should render payment button when Google Pay is ready and container is available', async () => {
    component.googlePayButtonContainer = new ElementRef(
      document.createElement('div')
    );

    await detectChanges();

    expect(mockOpfGooglePayService.renderPaymentButton).toHaveBeenCalledWith(
      component.googlePayButtonContainer
    );
  });
});
