import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as NgrxStore from '@ngrx/store';
import { of } from 'rxjs';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';
import { CartService } from '../../../cart/services';
import * as fromReducer from '../../../cart/store/reducers';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import { ComponentMapperService } from '../../../cms/services';
import * as fromCmsReducer from '../../../cms/store';
import * as fromRoot from '../../../routing/store';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { ComponentsModule } from './../../components/components.module';
import { CartPageLayoutComponent } from './cart-page-layout.component';
import { OutletDirective } from '../../../outlet';

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
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromReducer.getReducers()),
          cms: combineReducers(fromCmsReducer.getReducers())
        }),
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
