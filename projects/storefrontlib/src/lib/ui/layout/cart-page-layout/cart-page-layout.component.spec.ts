import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';

import { of } from 'rxjs';

import { OutletDirective } from '../../../outlet';
import { ComponentsModule } from './../../components/components.module';
import { CartService } from '../../../cart/facade';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { ComponentMapperService } from '../../../cms/services';
import * as fromCmsReducer from '../../../cms/store';
import * as fromReducer from '../../../cart/store/reducers';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';

import { CartPageLayoutComponent } from './cart-page-layout.component';

class MockCartService {
  removeCartEntry() {}

  loadCartDetails() {}
}

class MockMapperService {
  getComponentTypeByCode() {}
}

describe('CartPageLayoutComponent', () => {
  let component: CartPageLayoutComponent;
  let fixture: ComponentFixture<CartPageLayoutComponent>;
  let service: CartService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cart', fromReducer.getReducers()),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        ComponentsModule,
        CartSharedModule
      ],
      declarations: [
        CartPageLayoutComponent,
        CartDetailsComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
      ],
      providers: [
        { provide: CartService, useClass: MockCartService },
        { provide: ComponentMapperService, useClass: MockMapperService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageLayoutComponent);
    component = fixture.componentInstance;
    service = TestBed.get(CartService);

    spyOn(service, 'loadCartDetails').and.callThrough();
    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of('mockCart')
    );
  });

  it('should create cart page', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    component.cart$.subscribe(cart => {
      expect(cart).toBe('mockCart');
    });
  });
});
