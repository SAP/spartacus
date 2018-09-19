import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageComponent } from './category-page.component';
import { CategoryPageLayoutComponent } from '../../layout/category-page-layout/category-page-layout.component';
import { ProductListPageLayoutComponent } from '../../layout/product-list-page-layout/product-list-page-layout.component';
import { DynamicSlotComponent } from '../../../cms/components';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';
import { ActivatedRoute } from '@angular/router';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCms from '../../../cms/store';
import * as fromCart from '../../../cart/store';
import { of } from 'rxjs';

class MockActivatedRoute {
  params = of({
    categoryCode: '123',
    brandCode: '456',
    query: 'mockQuery'
  });
}

describe('CategoryPageComponent', () => {
  let component: CategoryPageComponent;
  let fixture: ComponentFixture<CategoryPageComponent>;
  let store: Store<fromCms.CmsState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.getReducers(),
          cms: combineReducers(fromCms.getReducers()),
          cart: combineReducers(fromCart.getReducers())
        }),
        ProductListModule
      ],
      declarations: [
        CategoryPageComponent,
        CategoryPageLayoutComponent,
        ProductListPageLayoutComponent,
        DynamicSlotComponent
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: MockActivatedRoute }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOn(store, 'select').and.returnValue(of('cartPage'));

    component.ngOnInit();

    expect(component.categoryCode).toEqual('123');
    expect(component.brandCode).toEqual('456');
    expect(component.query).toEqual('mockQuery');
    component.cmsPage$.subscribe(page => expect(page).toEqual('cartPage'));
  });
});
