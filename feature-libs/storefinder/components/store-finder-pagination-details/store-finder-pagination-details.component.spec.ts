import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, StoreFinderPaginationDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderPaginationDetailsComponent);
    component = fixture.componentInstance;
    // Use setInput so the OnPush component (v22 default) is marked for check.
    fixture.componentRef.setInput('pagination', { ...mockPagination });
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display proper pagination results info', () => {
    fixture.detectChanges();
    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;
    expect(detailsElement.textContent?.trim()).toContain(
      `1 - ${component.pagination.pageSize} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });

  it('should display last page', () => {
    fixture.componentRef.setInput('pagination', {
      ...mockPagination,
      currentPage: 2,
    });
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;

    expect(detailsElement.textContent?.trim()).toContain(
      `1 - ${component.pagination.totalResults} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });

  it('should display proper pagination results info when there is only one page', () => {
    fixture.componentRef.setInput('pagination', {
      ...mockPagination,
      totalResults: 15,
    });
    fixture.changeDetectorRef.markForCheck();

    fixture.detectChanges();

    const detailsElement = fixture.debugElement.query(
      By.css('.cx-pagination-details')
    ).nativeElement;

    expect(detailsElement.textContent?.trim()).toContain(
      `1 - ${component.pagination.totalResults} storeFinder.fromStoresFound count:${component.pagination.totalResults}`
    );
  });
});
