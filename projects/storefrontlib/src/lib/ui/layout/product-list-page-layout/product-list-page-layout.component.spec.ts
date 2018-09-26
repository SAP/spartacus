import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageLayoutComponent } from './product-list-page-layout.component';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromProduct from '../../../product/store';
import * as fromCart from '../../../cart/store';
import * as fromUser from '../../../user/store';
import { ProductSearchService } from '../../../product/services';

describe('ProductListPageComponent', () => {
  let component: ProductListPageLayoutComponent;
  let fixture: ComponentFixture<ProductListPageLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ProductListModule,
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          products: combineReducers(fromProduct.getReducers()),
          cart: combineReducers(fromCart.getReducers()),
          user: combineReducers(fromUser.getReducers())
        })
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
