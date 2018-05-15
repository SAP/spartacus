import { MaterialModule } from 'projects/storefrontapp/src/app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSortingComponent } from './product-sorting.component';

describe('ProductSortingComponent in product-list', () => {
  let component: ProductSortingComponent;
  let fixture: ComponentFixture<ProductSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ProductSortingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSortingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get sort options', () => {
    const options = [
      {
        code: 'relevance',
        label: 'Relevance'
      },
      {
        code: 'price',
        label: 'Price'
      }
    ];

    expect(component.sortOptions).toEqual(options);
  });
});
