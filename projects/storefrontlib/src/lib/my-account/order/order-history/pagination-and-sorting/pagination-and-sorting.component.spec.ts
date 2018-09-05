import { By } from '@angular/platform-browser';
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

    const pageZero = fixture.debugElement.queryAll(By.css('.page-number'))[0];

    pageZero.triggerEventHandler('click', { target: { value: 0 } });

    expect(component.viewPageEvent.emit).toHaveBeenCalledWith({
      currentPage: 0,
      sortCode: 'byDate'
    });
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
    component.currentPage = 0;

    const select = fixture.debugElement.query(By.css('select'));
    select.triggerEventHandler('change', {
      target: { value: 'byOrderNumber' }
    });

    expect(component.sortEvent.emit).toHaveBeenCalledWith({
      sortCode: 'byOrderNumber',
      currentPage: 0
    });
  });
});
