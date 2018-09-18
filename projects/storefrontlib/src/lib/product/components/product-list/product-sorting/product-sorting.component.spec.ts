import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductSortingComponent } from './product-sorting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

describe('ProductSortingComponent in product-list', () => {
  let component: ProductSortingComponent;
  let fixture: ComponentFixture<ProductSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgSelectModule, FormsModule],
      declarations: [ProductSortingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSortingComponent);
    component = fixture.componentInstance;
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
