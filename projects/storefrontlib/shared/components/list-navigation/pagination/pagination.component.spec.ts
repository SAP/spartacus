import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PaginationConfig } from './config/pagination.config';
import { PaginationComponent } from './pagination.component';
import { PaginationItemType } from './pagination.model';

const mockPaginationConfig: PaginationConfig = {
  pagination: {},
};

const mockActivatedRoute = {
  snapshot: {
    queryParams: {},
  },
};

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let debugEl: DebugElement;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [PaginationComponent],
        providers: [
          {
            provide: PaginationConfig,
            useValue: mockPaginationConfig,
          },

          { provide: ActivatedRoute, useValue: mockActivatedRoute },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    component.pagination = {
      currentPage: 1,
      totalPages: 10,
    };
  });

  describe('isCurrent', () => {
    it('should return true for current page = 1', () => {
      component.pagination.currentPage = 1;
      expect(
        component.isCurrent({ type: PaginationItemType.PAGE, number: 1 })
      ).toBeTruthy();
    });

    it('should return true for current page = 5', () => {
      component.pagination.currentPage = 5;
      expect(
        component.isCurrent({ type: PaginationItemType.PAGE, number: 5 })
      ).toBeTruthy();
    });

    it('should not return isCurrent for current page = 2', () => {
      component.pagination.currentPage = 1;
      expect(
        component.isCurrent({ type: PaginationItemType.PAGE, number: 2 })
      ).toBeFalsy();
    });

    it('should not return isCurrent for non-page', () => {
      component.pagination.currentPage = 1;
      expect(component.isCurrent({ type: null, number: 1 })).toBeFalsy();
    });
  });

  describe('isInactive', () => {
    it('should return true for 1st page', () => {
      component.pagination.currentPage = 0;
      expect(component.isInactive({ number: 0 })).toBeTruthy();
      expect(component.isInactive({ number: 1 })).toBeFalsy();
      expect(component.isInactive({ number: 6 })).toBeFalsy();
    });
    it('should return true for 2nd page', () => {
      component.pagination.currentPage = 1;
      expect(component.isInactive({ number: 0 })).toBeFalsy();
      expect(component.isInactive({ number: 1 })).toBeTruthy();
      expect(component.isInactive({ number: 2 })).toBeFalsy();
      expect(component.isInactive({ number: 6 })).toBeFalsy();
    });
  });

  describe('QueryParams', () => {
    it('should not query parameter if queryParams = null', () => {
      expect(component.getQueryParams({ number: 0 }) as Params).toEqual({});
    });

    describe('pageNr parameter', () => {
      beforeEach(() => {
        component.queryParam = 'currentPage';
      });
      it('should return { currentPage: 0 } for 1st page', () => {
        expect(component.getQueryParams({ number: 0 }) as Params).toEqual({
          currentPage: 0,
        });
      });
      it('should return { currentPage: 5 } for 5th page', () => {
        expect(component.getQueryParams({ number: 5 }) as Params).toEqual({
          currentPage: 5,
        });
      });
      it('should not query parameter for current page', () => {
        component.pagination.currentPage = 2;
        expect(
          component.getQueryParams({
            type: PaginationItemType.PAGE,
            number: 2,
          }) as Params
        ).toEqual({});
      });
    });
  });

  describe('UI', () => {
    describe('10 pages', () => {
      beforeEach(() => {
        component.pagination = {
          currentPage: 0,
          totalPages: 10,
        };
        fixture.detectChanges();
      });

      describe('disabled', () => {
        it('should have a disabled start link', () => {
          const el = debugEl.query(By.css('a.start')).nativeElement;
          expect(el.classList).toContain('disabled');
        });

        it('should have a disabled previous link', () => {
          const el = debugEl.query(By.css('a.start')).nativeElement;
          expect(el.classList).toContain('disabled');
        });

        it('should have disabled current page', () => {
          const el = debugEl.query(By.css('a.current')).nativeElement;
          expect(el.classList).toContain('disabled');
        });

        it('should not have disabled pages', () => {
          const el = debugEl.queryAll(By.css('a.page:not(.current)'))[0]
            .nativeElement;
          expect(el.classList).not.toContain('disabled');
        });

        it('should have an enabled next link', () => {
          const el = debugEl.query(By.css('a.next')).nativeElement;
          expect(el.classList).not.toContain('disabled');
        });

        it('should have an enabled end link', () => {
          const el = debugEl.query(By.css('a.end')).nativeElement;
          expect(el.classList).not.toContain('disabled');
        });
      });

      describe('tabIndex', () => {
        it('should have no tabIndex for start link', () => {
          const el = debugEl.query(By.css('a.start')).nativeElement;
          expect(el.tabIndex).toEqual(-1);
        });

        it('should have no tabIndex for previous link', () => {
          const el = debugEl.query(By.css('a.start')).nativeElement;
          expect(el.tabIndex).toEqual(-1);
        });

        it('should have no tabIndex for current link', () => {
          const el = debugEl.query(By.css('a.current')).nativeElement;
          expect(el.tabIndex).toEqual(-1);
        });

        it('should have tabIndex=0 for next link', () => {
          const el = debugEl.query(By.css('a.next')).nativeElement;
          expect(el.tabIndex).toEqual(0);
        });
        it('should have tabIndex=0 for end link', () => {
          const el = debugEl.query(By.css('a.end')).nativeElement;
          expect(el.tabIndex).toEqual(0);
        });
      });

      describe('pageChange', () => {
        it('should click next link', () => {
          const size = component.pagination.pageSize;
          const el: HTMLElement = debugEl.query(By.css('a.next')).nativeElement;
          el.click();
          fixture.detectChanges();
          let result;

          component.viewPageEvent
            .subscribe((event: any) => {
              result = event;
            })
            .unsubscribe();
          expect(result).toEqual(size);
        });
      });
    });

    describe('no pages', () => {
      it('should not have any pagination items', () => {
        component.pagination = {
          currentPage: 0,
          totalPages: 0,
        };
        fixture.detectChanges();
        const el = debugEl.queryAll(By.css('a'));
        expect(el.length).toEqual(0);
      });
    });

    describe('1 page', () => {
      it('should not have any pagination items', () => {
        component.pagination = {
          totalPages: 1,
        };
        fixture.detectChanges();
        const el = debugEl.queryAll(By.css('a'));
        expect(el.length).toEqual(0);
      });
    });
  });
});
