import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { PaginationAndSortingComponent } from './pagination-and-sorting.component';

describe('PaginationAndSortingComponent', () => {
  let component: PaginationAndSortingComponent;
  let fixture: ComponentFixture<PaginationAndSortingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [PaginationAndSortingComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationAndSortingComponent);
    component = fixture.componentInstance;
    component.pagination = { totalPages: 5 };
    component.sorts = [
      { code: 'byDate', selected: true },
      { code: 'byOrderNumber', selected: false }
    ];
    component.paginationBoundaries = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit viewPageEvent', () => {
    spyOn(component.viewPageEvent, 'emit');
    component.viewPage(0);
    expect(component.viewPageEvent.emit).toHaveBeenCalled();
  });

  it('should adjust pagination boundaries on viewPage', () => {
    component.viewPage(0);
    expect(component.paginationBoundaries).toBe(1);
    component.viewPage(1);
    expect(component.paginationBoundaries).toBe(1);
    component.viewPage(2);
    expect(component.paginationBoundaries).toBe(2);
    component.viewPage(3);
    expect(component.paginationBoundaries).toBe(3);
    component.viewPage(4);
    expect(component.paginationBoundaries).toBe(3);
  });

  it('should emit the sortPageEvent', () => {
    spyOn(component.sortEvent, 'emit');
    component.sortOrders();
    expect(component.sortEvent.emit).toHaveBeenCalled();
  });
});
