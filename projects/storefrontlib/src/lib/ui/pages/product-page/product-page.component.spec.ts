import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { RoutingService } from '@spartacus/core';

import { of } from 'rxjs';

import { ProductPageComponent } from './product-page.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'cx-product-details-page-layout',
  template: ''
})
export class MockProductDetailsPageLayoutComponent {
  @Input()
  productCode: string;
}

describe('ProductPageComponent in pages', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProductPageComponent,
        MockProductDetailsPageLayoutComponent
      ],
      providers: [
        { provide: RoutingService, useValue: { getRouterState: () => {} } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    routingService = TestBed.get(RoutingService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get "productCode" from route parameters', () => {
    spyOn(routingService, 'getRouterState').and.returnValue(
      of({ state: { params: { productCode: 'mockProductCode' } } })
    );
    fixture.detectChanges();
    expect(component.productCode).toEqual('mockProductCode');
  });

  describe('product details page layout', () => {
    const getProductDetailsLayout = () =>
      fixture.debugElement.query(By.css('cx-product-details-page-layout'));

    it('should be rendered when "productCode" is defined', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { params: { productCode: 'mockProductCode' } } })
      );
      fixture.detectChanges();
      expect(getProductDetailsLayout()).toBeTruthy();
    });

    it('should NOT be rendered when "productCode" is undefined', () => {
      spyOn(routingService, 'getRouterState').and.returnValue(
        of({ state: { params: { productCode: undefined } } })
      );
      fixture.detectChanges();
      expect(getProductDetailsLayout()).toBeFalsy();
    });
  });
});
