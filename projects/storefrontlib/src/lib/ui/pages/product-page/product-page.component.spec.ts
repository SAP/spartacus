import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { RoutingService } from '@spartacus/core';

import { of } from 'rxjs';

import { ProductPageComponent } from './product-page.component';

@Component({
  selector: 'cx-product-details-page-layout',
  template: ''
})
export class MockProductDetailsPageLayoutComponent {
  @Input()
  productCode: string;
}

const routerState = {
  state: {
    params: {
      productCode: 'mockProductCode'
    }
  }
};
const mockRoutingService = {
  getRouterState() {
    return of(routerState);
  }
};
describe('ProductPageComponent in pages', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductPageComponent,
        MockProductDetailsPageLayoutComponent
      ],
      providers: [{ provide: RoutingService, useValue: mockRoutingService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component.productCode).toEqual('mockProductCode');
  });
});
