import { OccProductSearchService } from './../../../../occ/occ-core/product-search.service';
import { OccProductService } from './../../../../occ/occ-core/product.service';
import { SiteContextService } from './../../../../data/site-context.service';
import { ProductModelService } from './../../../../data/product-model.service';

import { ProductModule } from './../product.module';
import { MaterialModule } from 'app/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributesComponent } from './product-attributes.component';
import { DebugElement } from '@angular/core';

import * as fromRoot from '../../../../routing/store';
import * as fromCmsReducer from '../../../../newcms/store/reducers';
import { StoreModule, Store, combineReducers } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductLoaderService } from '../../../../data/product-loader.service';

class OccProductServiceMock {}
class OccProductSearchServiceMock {}
class ProductModelServiceMock {}
class SiteContextServiceMock {
  getSiteContextChangeSubscription() {
    return new BehaviorSubject<any>(null);
  }
}

fdescribe('ProductAttributesComponent in UI', () => {
  let store: Store<fromCmsReducer.CmsState>;
  let component: ProductAttributesComponent;
  let fixture: ComponentFixture<ProductAttributesComponent>;
  let el: DebugElement;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            cms: combineReducers(fromCmsReducer.reducers)
          }),
          RouterTestingModule
        ],
        declarations: [ProductAttributesComponent],
        providers: [
          ProductLoaderService,
          {
            provide: OccProductService,
            useClass: OccProductServiceMock
          },
          {
            provide: OccProductSearchService,
            useClass: OccProductSearchServiceMock
          },
          {
            provide: ProductModelService,
            useClass: ProductModelServiceMock
          },
          {
            provide: SiteContextService,
            useClass: SiteContextServiceMock
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributesComponent);
    component = fixture.componentInstance;

    el = fixture.debugElement;

    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load specified data', () => {
    // component.productCode = '1234';
    // component.ngOnChanges();
  });
});
