import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import * as fromCheckout from '../../../../store';
import * as fromCart from '../../../../../cart/store';
import * as fromUser from '@spartacus/core';

import { StoreModule, Store } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { BillingAddressFormComponent } from './billing-address-form.component';
import { ReactiveFormsModule } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BillingAddressFormModule } from './billing-address-form.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangeDetectionStrategy } from '@angular/core';
import { CheckoutService } from '../../../../facade/checkout.service';
import { CartDataService } from '../../../../../cart/facade/cart-data.service';
import { CartService } from '../../../../../cart/facade/cart.service';

describe('BillingAddressFormComponent', () => {
  let store: Store<fromCheckout.CheckoutState>;
  let component: BillingAddressFormComponent;
  let fixture: ComponentFixture<BillingAddressFormComponent>;
  let mockSelectors: {
    user: {
      getAllTitles: BehaviorSubject<any[]>;
      getAllRegions: BehaviorSubject<any[]>;
    };
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BillingAddressFormModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('checkout', fromCheckout.getReducers()),
        StoreModule.forFeature('cart', fromCart.getReducers()),
        StoreModule.forFeature('user', fromUser.getReducers())
      ],
      providers: [CheckoutService, CartService, CartDataService, NgbModal]
    })
      .overrideComponent(BillingAddressFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingAddressFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    mockSelectors = {
      user: {
        getAllTitles: new BehaviorSubject([]),
        getAllRegions: new BehaviorSubject([])
      }
    };
    spyOnProperty(NgrxStore, 'select').and.returnValue(selector => {
      switch (selector) {
        case fromUser.getAllTitles:
          return () => mockSelectors.user.getAllTitles;
        case fromUser.getAllRegions:
          return () => mockSelectors.user.getAllRegions;
      }
    });

    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
