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
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from '../../../../ui';

describe('ProductGridItemComponent in product-list', () => {
  let component: ProductGridItemComponent;
  let fixture: ComponentFixture<ProductGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbRatingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        })
      ],
      declarations: [
        ProductGridItemComponent,
        PictureComponent,
        AddToCartComponent,
        StarRatingComponent
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
