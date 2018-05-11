import { MaterialModule } from 'src/app/material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFacetNavigationComponent } from './product-facet-navigation.component';

describe('ProductFacetNavigationComponent in product-list', () => {
  let component: ProductFacetNavigationComponent;
  let fixture: ComponentFixture<ProductFacetNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ProductFacetNavigationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFacetNavigationComponent);
    component = fixture.componentInstance;

    spyOn(component.filter, 'emit').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle value', () => {
    component.toggleValue('mockQuery');
    expect(component.filter.emit).toHaveBeenCalledWith('mockQuery');
  });
});
