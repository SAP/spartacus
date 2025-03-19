/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterState, RoutingService } from '@spartacus/core';
import { BehaviorSubject, of } from 'rxjs';
import { OpfQuickBuyProviderType } from '../../root/model';
import { OpfQuickBuyButtonsComponent } from './opf-quick-buy-buttons.component';
import { OpfQuickBuyButtonsService } from './opf-quick-buy-buttons.service';
import createSpy = jasmine.createSpy;

const routerStateSubject = new BehaviorSubject<RouterState>({
  state: {
    semanticRoute: 'cart',
  },
} as unknown as RouterState);

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = createSpy().and.returnValue(
    routerStateSubject.asObservable()
  );
}

describe('OpfQuickBuyButtonsComponent', () => {
  let component: OpfQuickBuyButtonsComponent;
  let fixture: ComponentFixture<OpfQuickBuyButtonsComponent>;
  let opfQuickBuyButtonsServiceMock: any;

  beforeEach(async () => {
    opfQuickBuyButtonsServiceMock = jasmine.createSpyObj('OpfQuickBuyService', [
      'getPaymentGatewayConfiguration',
      'isQuickBuyProviderEnabled',
    ]);

    await TestBed.configureTestingModule({
      declarations: [OpfQuickBuyButtonsComponent],
      providers: [
        {
          provide: OpfQuickBuyButtonsService,
          useValue: opfQuickBuyButtonsServiceMock,
        },
        { provide: RoutingService, useValie: MockRoutingService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpfQuickBuyButtonsComponent);
    component = fixture.componentInstance;

    opfQuickBuyButtonsServiceMock.getPaymentGatewayConfiguration.and.returnValue(
      of({})
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPaymentGatewayConfiguration on init', () => {
    expect(
      opfQuickBuyButtonsServiceMock.getPaymentGatewayConfiguration
    ).toHaveBeenCalled();
  });

  it('should determine if a payment method is enabled', () => {
    const provider = OpfQuickBuyProviderType.APPLE_PAY;
    const activeConfiguration = {};
    opfQuickBuyButtonsServiceMock.isQuickBuyProviderEnabled.and.returnValue(
      true
    );

    expect(
      component.isPaymentMethodEnabled(provider, activeConfiguration)
    ).toBeTruthy();
    expect(
      opfQuickBuyButtonsServiceMock.isQuickBuyProviderEnabled
    ).toHaveBeenCalledWith(provider, activeConfiguration);
  });
});
