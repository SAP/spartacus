import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSummaryComponent } from './product-summary.component';
import { ProductLoaderService } from 'app/data/product-loader.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'app/material.module';

fdescribe('ProductSummaryComponent in ui', () => {
  let productSummaryComponent: ProductSummaryComponent;
  let fixture: ComponentFixture<ProductSummaryComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, MaterialModule],
        declarations: [ProductSummaryComponent],
        providers: [{ provide: ProductLoaderService }]
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
