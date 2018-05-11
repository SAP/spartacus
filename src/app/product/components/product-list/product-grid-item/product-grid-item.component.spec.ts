import { MaterialModule } from 'src/app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductGridItemComponent } from './product-grid-item.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService } from '../../../../cart/services';
import * as fromRoot from '../../../../routing/store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import { StoreModule, combineReducers } from '@ngrx/store';

describe('ProductGridItemComponent in product-list', () => {
  let component: ProductGridItemComponent;
  let fixture: ComponentFixture<ProductGridItemComponent>;

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
      declarations: [
        ProductGridItemComponent,
        PictureComponent,
        AddToCartComponent
      ],
      providers: [CartService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGridItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
