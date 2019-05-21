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

  describe('pageChange function', () => {
    it('should change pages', () => {
      component.pageChange(MIDDLE_PAGE);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(MIDDLE_PAGE);
      });
    });
  });

  describe('GET functions', () => {
    it('should return first page', () => {
      expect(component.getPageFirst()).toEqual(FIRST_PAGE);
    });

    it('should return last page', () => {
      expect(component.getPageLast()).toEqual(TOTAL_PAGES);
    });

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
  });

  describe('clickPageNo function', () => {
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
});
