import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { I18nTestingModule, PaginationModel } from '@spartacus/core';
import { StoreFinderPaginationDetailsComponent } from './store-finder-pagination-details.component';

const mockPagination: PaginationModel = {
  pageSize: 20,
  totalResults: 49,
  currentPage: 0,
};

describe('StoreFinderPaginationDetailsComponent', () => {
  let component: StoreFinderPaginationDetailsComponent;
  let fixture: ComponentFixture<StoreFinderPaginationDetailsComponent>;

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
      `1 - ${component.pagination.pageSize} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });

  it('should display last page', () => {
    const CURRENT_PAGE = 2;
    component.pagination.currentPage = CURRENT_PAGE;
    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;

    expect(detailsElement.innerText).toContain(
      `1 - ${component.pagination.totalResults} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });

  it('should display proper pagination results info when there is only one page', () => {
    const TOTAL_RESULTS = 15;
    component.pagination.totalResults = TOTAL_RESULTS;

    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;

    expect(detailsElement.innerText).toContain(
      `1 - ${component.pagination.totalResults} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });
});
