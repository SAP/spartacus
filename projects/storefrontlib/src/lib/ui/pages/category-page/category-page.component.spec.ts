import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPageComponent } from './category-page.component';
import { CategoryPageLayoutComponent } from '../../layout/category-page-layout/category-page-layout.component';
import { ProductListPageLayoutComponent } from '../../layout/product-list-page-layout/product-list-page-layout.component';
import {
  DynamicSlotComponent,
  ComponentWrapperDirective
} from '../../../cms/components';
import * as NgrxStore from '@ngrx/store';
import { ProductListModule } from '../../../product/components/product-list/product-list.module';
import { ActivatedRoute } from '@angular/router';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as fromRoot from '../../../routing/store';
import * as fromCms from '../../../cms/store';
import * as fromCart from '../../../cart/store';
import { of } from 'rxjs';
import { OutletDirective } from '../../../outlet';

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
        DynamicSlotComponent,
        ComponentWrapperDirective,
        OutletDirective
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    spyOnProperty(NgrxStore, 'select').and.returnValue(() => () =>
      of('cartPage')
    );
    component.ngOnInit();

    expect(component.categoryCode).toEqual('123');
    expect(component.brandCode).toEqual('456');
    expect(component.query).toEqual('mockQuery');
    component.cmsPage$.subscribe(page => expect(page).toEqual('cartPage'));
  });
});
