import { MaterialModule } from 'projects/storefrontlib/src/lib/material.module';
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
    component.grid = { mode: 'test' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit sort event', () => {
    spyOn(component.sortListEvent, 'emit');
    component.sortList('sortCode');
    expect(component.sortListEvent.emit).toHaveBeenCalledWith('sortCode');
  });
});
