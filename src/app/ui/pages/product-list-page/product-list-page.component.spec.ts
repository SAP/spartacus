import { MaterialModule } from 'app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPageComponent } from './product-list-page.component';
import { ProductListPageLayoutComponent } from '../../layout/product-list-page-layout/product-list-page-layout.component';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRouting from '../../../routing/store';
import { of } from 'rxjs/observable/of';
import { ProductListComponent } from '../../../product/components/product-list/container/product-list.component';
import { ProductPagingComponent } from '../../../product/components/product-list/product-paging/product-paging.component';
import { ProductSortingComponent } from '../../../product/components/product-list/product-sorting/product-sorting.component';

// This import statement is more than 14 chars long, hence its added to ng lint ignore list
/* tslint:disable */ import { ProductFacetNavigationComponent } from '../../../product/components/product-list/product-facet-navigation/product-facet-navigation.component'; /* tslint:enable */

import { ProductGridItemComponent } from '../../../product/components/product-list/product-grid-item/product-grid-item.component';
import { ProductListItemComponent } from '../../../product/components/product-list/product-list-item/product-list-item.component';
import { ProductLineItemComponent } from '../../../product/components/product-list/product-line-item/product-line-item.component';
import { AddToCartComponent } from '../../../cms-lib/add-to-cart/add-to-cart.component';
import { PictureComponent } from '../../components/media/picture/picture.component';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../routing/store';

const routerState = {
  state: {
    params: {
      query: 'mockQuery'
    }
  }
};

fdescribe('ProductListPageComponent in pages', () => {
  let store: Store<fromRouting.State>;
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers
          })
        ],
        declarations: [
          ProductListComponent,
          ProductPagingComponent,
          ProductSortingComponent,
          ProductListPageComponent,
          ProductFacetNavigationComponent,
          ProductGridItemComponent,
          ProductListItemComponent,
          ProductLineItemComponent,
          AddToCartComponent,
          PictureComponent,
          ProductListPageLayoutComponent
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;

    store = TestBed.get(Store);

    spyOn(store, 'select').and.returnValue(of(routerState));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();

    expect(component.query).toEqual('mockQuery');
  });
});
