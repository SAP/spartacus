import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationModel } from '@spartacus/core';

const FIRST_PAGE = 1;
const MIDDLE_PAGE = 5;
const TOTAL_PAGES = 10;
const OUT_OF_RANGE_MIN = 0;
const OUT_OF_RANGE_MAX = 11;

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let pagination: PaginationModel;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    pagination = {
      currentPage: FIRST_PAGE,
      totalPages: TOTAL_PAGES,
    };
    component.pagination = pagination;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('GET functions', () => {
    it('should return next page', () => {
      expect(component.getPageNext()).toEqual(FIRST_PAGE + 2);
    });

    it('should return previous page', () => {
      component.pagination.currentPage = MIDDLE_PAGE;
      expect(component.getPagePrevious()).toEqual(MIDDLE_PAGE);
    });

    it('should return array of pages', () => {
      const pageArray = Array(TOTAL_PAGES);
      expect(component.getPageIndicies()).toEqual(pageArray);
    });

    it('should return bottom of page window', () => {
      expect(component.getPageWindowMinIndex()).toEqual(0);
    });

    it('should return top of page window', () => {
      expect(component.getPageWindowMaxIndex()).toEqual(2);
    });
  });

  describe('hasPages()', () => {
    it('should have pages', () => {
      expect(component.hasPages()).toBeTruthy();
    });

    it('should NOT have pages', () => {
      component.pagination.totalPages = 0;
      expect(component.hasPages()).not.toBeTruthy();
    });
  });

  describe('onPage functions', () => {
    it('should be on first page', () => {
      component.pagination.currentPage = 0;
      expect(component.onFirstPage()).toBeTruthy();
    });

    it('should NOT be on first page', () => {
      component.pagination.currentPage = TOTAL_PAGES - 1;
      expect(component.onFirstPage()).not.toBeTruthy();
    });

    it('should be on last page', () => {
      component.pagination.currentPage = TOTAL_PAGES - 1;
      expect(component.onLastPage()).toBeTruthy();
    });

    it('should NOT be on last page', () => {
      expect(component.onLastPage()).not.toBeTruthy();
    });

    it('should be on middle page', () => {
      component.pagination.currentPage = MIDDLE_PAGE;
      expect(component.onPageIndex(MIDDLE_PAGE)).toBeTruthy();
    });

    it('should NOT be on middle page', () => {
      expect(component.onPageIndex(MIDDLE_PAGE)).not.toBeTruthy();
    });
  });

  describe('hidePageIndex()', () => {
    it('should hide middle index', () => {
      expect(component.hidePageIndex(MIDDLE_PAGE)).toBeTruthy();
    });

    it('should NOT hide first index', () => {
      expect(component.hidePageIndex(FIRST_PAGE)).not.toBeTruthy();
    });

    it('should NOT hide second index', () => {
      expect(component.hidePageIndex(FIRST_PAGE + 1)).not.toBeTruthy();
    });

    it('should hide second-last index', () => {
      expect(component.hidePageIndex(TOTAL_PAGES - 2)).toBeTruthy();
    });

    it('should NOT hide last index', () => {
      expect(component.hidePageIndex(TOTAL_PAGES - 1)).not.toBeTruthy();
    });
  });

  describe('showDots()', () => {
    beforeEach(() => {
      component.pagination.currentPage = MIDDLE_PAGE;
    });

    it('should NOT show dots at current index', () => {
      expect(component.showDots(MIDDLE_PAGE)).not.toBeTruthy();
    });

    it('should NOT show dots at first index', () => {
      expect(component.showDots(FIRST_PAGE)).not.toBeTruthy();
    });

    it('should NOT show dots at last index', () => {
      expect(component.showDots(TOTAL_PAGES - 1)).not.toBeTruthy();
    });

    it('should show dots one index below bottom page window', () => {
      expect(component.showDots(MIDDLE_PAGE - 3)).toBeTruthy();
    });

    it('should show dots one index above top page window', () => {
      expect(component.showDots(MIDDLE_PAGE + 1)).toBeTruthy();
    });

    it('should NOT show dots two indexes below bottom page window', () => {
      expect(component.showDots(MIDDLE_PAGE - 4)).not.toBeTruthy();
    });

    it('should show dots two indexes above top page window', () => {
      expect(component.showDots(MIDDLE_PAGE + 2)).not.toBeTruthy();
    });
  });

  describe('clickPageNo()', () => {
    it('should change pages by index', () => {
      const newPage = component.clickPageNo(MIDDLE_PAGE);
      expect(newPage).toEqual(MIDDLE_PAGE);
    });

    it('should change pages to first', () => {
      const newPage = component.clickPageNo(FIRST_PAGE);
      expect(newPage).toEqual(FIRST_PAGE);
    });

    it('should change pages to last', () => {
      const newPage = component.clickPageNo(TOTAL_PAGES);
      expect(newPage).toEqual(TOTAL_PAGES);
    });

    it('should not change pages when index out of max range', () => {
      const newPage = component.clickPageNo(OUT_OF_RANGE_MAX);
      expect(newPage).toEqual(FIRST_PAGE);
    });

    it('should not change pages when index out of min range', () => {
      const newPage = component.clickPageNo(OUT_OF_RANGE_MIN);
      expect(newPage).toEqual(FIRST_PAGE);
    });
  });

  describe('pageChange()', () => {
    it('should change pages', () => {
      component.pageChange(MIDDLE_PAGE);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(MIDDLE_PAGE);
      });
    });
  });
});
