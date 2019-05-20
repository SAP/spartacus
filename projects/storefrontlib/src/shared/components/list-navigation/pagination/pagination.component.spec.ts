import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationModel } from '@spartacus/core';

const FIRST_PAGE = 1;
const TOTAL_PAGES = 10;

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
      component.pageChange(5);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(5);
      });
    });
  });

  describe('clickPageNo function', () => {
    it('should change pages by index', () => {
      const newPage = component.clickPageNo(5);
      expect(newPage).toEqual(5);
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
      const newPage = component.clickPageNo(TOTAL_PAGES + 1);
      expect(newPage).toEqual(FIRST_PAGE);
    });

    it('should not change pages when index out of min range', () => {
      const newPage = component.clickPageNo(FIRST_PAGE - 1);
      expect(newPage).toEqual(FIRST_PAGE);
    });
  });
});
