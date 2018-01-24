import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from './product-summary.component';
import { ProductLoaderService } from 'app/data/product-loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'app/material.module';
import { of } from 'rxjs/observable/of';

class MockProductLoaderService {
  loadProduct(productCode) {}
  getSubscription(productCode) {}
}

fdescribe('ProductSummaryComponent in ui', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;
  let productLoader: ProductLoaderService;

  const componentData = 'Mock data for product summary component.';

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, MaterialModule],
        declarations: [ProductSummaryComponent],
        providers: [
          {
            provide: ProductLoaderService,
            useClass: MockProductLoaderService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSummaryComponent);
    productSummaryComponent = fixture.componentInstance;
    productLoader = TestBed.get(ProductLoaderService);

    spyOn(productLoader, 'getSubscription').and.returnValue(of(componentData));
  });

  it('should be created', () => {
    expect(productSummaryComponent).toBeTruthy();
  });

  it('should call ngOnChanges()', () => {
    productSummaryComponent.productCode = '123456';
    productSummaryComponent.ngOnChanges();
    expect(productSummaryComponent.model).toEqual(componentData);
  });
});
