import { MaterialModule } from 'src/app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductLineItemComponent } from './product-line-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService } from '../../../../cart/services';
import * as fromRoot from '../../../../routing/store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import { StoreModule, combineReducers } from '@ngrx/store';

describe('ProductLineItemComponent in product-list', () => {
  let component: ProductLineItemComponent;
  let fixture: ComponentFixture<ProductLineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          cart: combineReducers(fromCart.reducers),
          user: combineReducers(fromUser.reducers)
        })
      ],
      declarations: [ProductLineItemComponent, AddToCartComponent],
      providers: [CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductLineItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
