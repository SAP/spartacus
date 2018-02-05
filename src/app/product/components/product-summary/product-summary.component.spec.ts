import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'app/material.module';
import { ProductSummaryComponent } from '../product-summary/product-summary.component';
import * as fromRoot from './../../../routing/store';
import * as fromStore from './../../store';
import { StoreModule, combineReducers } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('ProductSummaryComponent in product', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [
          MaterialModule,
          StoreModule.forRoot({
            ...fromRoot.reducers,
            products: combineReducers(fromStore.reducers)
          }),
          RouterTestingModule
        ],
        declarations: [ProductSummaryComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });
});
