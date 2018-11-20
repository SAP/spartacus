import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Input, Component } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { OutletDirective } from '../../../outlet';
import { ComponentsModule } from './../../components/components.module';
import { CartService } from '../../../cart/facade';
import * as fromCart from '../../../cart/store';
import { ComponentWrapperDirective } from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store';
import { CartPageLayoutComponent } from '../../layout/cart-page-layout/cart-page-layout.component';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';

import { CartPageComponent } from './cart-page.component';

@Component({
  selector: 'cx-dynamic-slot',
  template: 'MockDynamicSlotComponent'
})
export class MockDynamicSlotComponent {
  @Input()
  position: string;
}
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
        StoreModule.forRoot({}),
        StoreModule.forFeature('cms', fromCmsReducer.getReducers()),
        StoreModule.forFeature('cart', fromCart.getReducers()),

        ComponentsModule,
        CartSharedModule
      ],
      declarations: [
        CartPageComponent,
        CartPageLayoutComponent,
        MockDynamicSlotComponent,
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
