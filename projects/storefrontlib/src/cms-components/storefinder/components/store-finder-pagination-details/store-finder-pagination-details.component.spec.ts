import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, PaginationModel } from '@spartacus/core';
import { StoreFinderPaginationDetailsComponent } from './store-finder-pagination-details.component';

describe('StoreFinderPaginationDetailsComponent', () => {
  let component: StoreFinderPaginationDetailsComponent;
  let fixture: ComponentFixture<StoreFinderPaginationDetailsComponent>;

  const mockPagination: PaginationModel = {
    pageSize: 20,
    totalResults: 49,
    currentPage: 0,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [StoreFinderPaginationDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPaginationDetailsComponent);
    component = fixture.componentInstance;
    component.pagination = mockPagination;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper pagination results info', () => {
    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;

    expect(detailsElement.innerText).toContain(
      `1 - ${component.pagination.pageSize} storeFinder.fromStoresFound count:${
        component.pagination.totalResults
      }`
    );
  });
});
