import { Component, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Product, I18nTestingModule } from '@spartacus/core';
import { CurrentProductService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { VariantsMultiDimensionalComponent } from './variants-multi-dimensional.component';

const mockProduct: Product = {
  name: 'mockProduct',
  code: 'code2',
  multidimensional: true,
  variantMatrix: [{}, {}],
};

class MockCurrentProductService {
  getProduct(): Observable<Product> {
    return of(mockProduct);
  }
}

@Component({
  selector: 'cx-variants-multi-dimensional-selector',
  template: '',
})
class MockVariantsMultiDimensionalSelectorComponent {
  @Input() product: Product;
}

describe('VariantsMultiDimensionalComponent', () => {
  let component: VariantsMultiDimensionalComponent;
  let fixture: ComponentFixture<VariantsMultiDimensionalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          VariantsMultiDimensionalComponent,
          MockVariantsMultiDimensionalSelectorComponent,
        ],
        imports: [RouterTestingModule, I18nTestingModule],
        providers: [
          {
            provide: CurrentProductService,
            useClass: MockCurrentProductService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VariantsMultiDimensionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
