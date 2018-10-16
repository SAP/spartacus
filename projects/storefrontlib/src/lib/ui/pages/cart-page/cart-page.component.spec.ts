import { ComponentsModule } from './../../components/components.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { combineReducers, StoreModule } from '@ngrx/store';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';
import { CartService } from '../../../cart/services';
import * as fromCart from '../../../cart/store';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store';

import * as fromRoot from '../../../routing/store';
import { CartPageLayoutComponent } from '../../layout/cart-page-layout/cart-page-layout.component';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { CartPageComponent } from './cart-page.component';
import { OutletDirective } from '../../../outlet';

export class MockCartService {
  loadCartDetails() {}
}

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCmsReducer.getReducers()),
          cart: combineReducers(fromCart.getReducers())
        }),
        ComponentsModule,
        CartSharedModule
      ],
      declarations: [
        CartPageComponent,
        CartPageLayoutComponent,
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective,
        CartDetailsComponent
      ],
      providers: [{ provide: CartService, useClass: MockCartService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
