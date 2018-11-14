import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';
import { StoreModule } from '@ngrx/store';

// import * as fromProduct from '../../../product/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { ProductSearchService } from '@spartacus/core';

describe('ProductListPageComponent', () => {
  let component: ProductListPageLayoutComponent;
  let fixture: ComponentFixture<ProductListPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductListModule,
        StoreModule.forRoot({}),
        // StoreModule.forFeature('products', fromProduct.getReducers()),
        StoreModule.forFeature('cart', fromCart.getReducers()),
        StoreModule.forFeature('user', fromUser.getReducers())
      ],
      providers: [ProductSearchService],
      declarations: [ProductListPageLayoutComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
