import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { PaginationModel } from '@spartacus/core';

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
      currentPage: 1,
      totalPages: 10,
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
      component.clickPageNo(5);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(5);
      });
    });

    it('should change pages to first', () => {
      component.clickPageNo(1);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(1);
      });
    });

    // @todo: Not being tested properly as is
    it('should not change pages when index out of max range', () => {
      component.clickPageNo(11);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(1);
      });
    });

    // @todo: Not being tested properly as is
    it('should not change pages when index out of max range', () => {
      component.clickPageNo(0);
      component.viewPageEvent.subscribe((event: any) => {
        expect(event).toEqual(1);
      });
    });
  });
});
