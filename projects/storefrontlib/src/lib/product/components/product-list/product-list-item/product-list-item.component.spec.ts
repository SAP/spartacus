import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListItemComponent } from './product-list-item.component';
import { PictureComponent } from '../../../../ui/components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AddToCartComponent } from '../../../../cart/components/add-to-cart/add-to-cart.component';
import { CartService, CartDataService } from '../../../../cart/services';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../../routing/store';
import * as fromCart from '../../../../cart/store';
import * as fromUser from '../../../../user/store';
import * as fromAuth from '../../../../auth/store';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { StarRatingComponent } from '../../../../ui';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ProductListItemComponent in product-list', () => {
  let component: ProductListItemComponent;
  let fixture: ComponentFixture<ProductListItemComponent>;

  const mockProduct = {
    name: 'Test product',
    summary: 'Test summary',
    code: '1',
    averageRating: 4.5,
    stock: {
      stockLevelStatus: 'inStock'
    },
    price: {
      formattedValue: '$100,00'
    },
    images: {
      PRIMARY: {}
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NgbRatingModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers()),
          auth: combineReducers(fromAuth.getReducers())
        })
      ],
      declarations: [
        ProductListItemComponent,
        PictureComponent,
        AddToCartComponent,
        StarRatingComponent
      ],
      providers: [CartService, CartDataService]
    })
      .overrideComponent(ProductListItemComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListItemComponent);
    component = fixture.componentInstance;

    component.product = mockProduct;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product name', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-product-search-list__name'
      ).textContent
    ).toContain(component.product.name);
  });

  it('should display product summary', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-product-search-list__summary'
      ).textContent
    ).toContain(component.product.summary);
  });

  it('should display product formatted price', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector(
        '.y-product-search-list__price'
      ).textContent
    ).toContain(component.product.price.formattedValue);
  });

  it('should display product image', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('y-picture')
    ).not.toBeNull();
  });

  it('should display raiting component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('y-star-rating')
    ).not.toBeNull();
  });

  it('should display add to cart component', () => {
    expect(
      fixture.debugElement.nativeElement.querySelector('y-add-to-cart')
    ).not.toBeNull();
  });

  it('should not display add to cart component when product is out of stock', () => {
    component.product.stock.stockLevelStatus = 'outOfStock';
    fixture.detectChanges();

    expect(
      fixture.debugElement.nativeElement.querySelector('y-add-to-cart')
    ).toBeNull();
  });
});
