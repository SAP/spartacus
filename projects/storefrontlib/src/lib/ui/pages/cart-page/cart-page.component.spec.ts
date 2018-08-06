import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { combineReducers, StoreModule } from '@ngrx/store';
import { CartDetailsComponent } from '../../../cart/components/cart-details/container/cart-details.component';
import { CartService } from '../../../cart/services';
import * as fromCart from '../../../cart/store';
import {
  ComponentWrapperComponent,
  DynamicSlotComponent
} from '../../../cms/components';
import * as fromCmsReducer from '../../../cms/store';
import * as fromRoot from '../../../routing/store';
import { CartPageLayoutComponent } from '../../layout/cart-page-layout/cart-page-layout.component';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { MediaModule } from './../../components/media/media.module';
import { CartPageComponent } from './cart-page.component';

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
          ...fromRoot.reducers,
          cms: combineReducers(fromCmsReducer.reducers),
          cart: combineReducers(fromCart.reducers)
        }),
        MediaModule,
        CartSharedModule
      ],
      declarations: [
        CartPageComponent,
        CartPageLayoutComponent,
        DynamicSlotComponent,
        ComponentWrapperComponent,
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
