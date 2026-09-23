import { DebugElement, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { FeatureDirective, I18nTestingModule } from '@spartacus/core';
import { FocusConfig, FocusDirective } from '@spartacus/storefront';
import { MockFeatureDirective } from '@spartacus/storefront/testing/mock-feature-directive';
import { vi } from 'vitest';
import { provideMockFeatureToggles } from 'core-libs/core/src/features-config/feature-toggles/testing';
import { CxRovingTabindexDirective } from '../../../directives/roving-tabindex/roving-tabindex.directive';
import { PaginationConfig } from './config/pagination.config';
import { PaginationComponent } from './pagination.component';
import { PaginationItemType } from './pagination.model';

const mockPaginationConfig: PaginationConfig = {
  pagination: {
    addStart: true,
    addEnd: true,
    addNext: true,
    addPrevious: true,
  },
};

const mockActivatedRoute = {
  snapshot: {
    queryParams: {},
  },
};

@Directive({
  selector: '[cxFocus]',
  standalone: true,
})
export class MockFocusDirective {
  @Input('cxFocus') config: FocusConfig;
}

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let debugEl: DebugElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [
        {
          provide: PaginationConfig,
          useValue: mockPaginationConfig,
        },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideMockFeatureToggles({ a11yPaginationKeyboardNavigation: true }),
      ],
    })
      .overrideComponent(PaginationComponent, {
        remove: { imports: [FocusDirective, FeatureDirective] },
        add: {
          imports: [
            I18nTestingModule,
            MockFocusDirective,
            MockFeatureDirective,
          ],
        },
      })
      .compileComponents();
  });

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
        it('should set tabindex=0 on first active (non-disabled) link', () => {
          // With a11yPaginationKeyboardNavigation the directive owns tabindex.
          // The first non-disabled link in DOM order gets tabindex=0.
          const firstActive = debugEl.query(By.css('a:not(.disabled)')).nativeElement;
          expect(firstActive.tabIndex).toEqual(0);
        });

        it('should set tabindex=-1 on all other active links', () => {
          const activeLinks = debugEl.queryAll(By.css('a:not(.disabled)'));
          activeLinks.slice(1).forEach((el) => {
            expect(el.nativeElement.tabIndex).toEqual(-1);
          });
        });

        it('should set tabindex=-1 on disabled links', () => {
          const disabledLinks = debugEl.queryAll(By.css('a.disabled'));
          disabledLinks.forEach((el) => {
            // Template sets [attr.tabindex]="-1" on disabled links so the browser
            // excludes them from Tab order despite RouterLink setting a real href.
            expect(el.nativeElement.getAttribute('tabindex')).toBe('-1');
          });
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

  describe('focus behavior', () => {
    it('should maintain focus on the selected pagination item after click', () => {
      component.pagination = {
        currentPage: 1,
        totalPages: 5,
      };
      fixture.detectChanges();

      const pageItems = debugEl.queryAll(By.css('a.page'));
      const secondPageItem = pageItems[1].nativeElement;

      // Simulate focus manually
      secondPageItem.focus();
      fixture.detectChanges();

      expect(document.activeElement).toBe(secondPageItem);
    });

    describe('arrow key navigation (a11yPaginationKeyboardNavigation on)', () => {
      beforeEach(() => {
        component.pagination = { currentPage: 0, totalPages: 5 };
        fixture.detectChanges();
      });

      it('should move focus to the next active link on ArrowRight', () => {
        const host = fixture.nativeElement as HTMLElement;
        const activeLinks = Array.from(
          host.querySelectorAll<HTMLElement>('a:not(.disabled)')
        );
        activeLinks[0].focus();
        const focusSpy = vi.spyOn(activeLinks[1], 'focus');

        activeLinks[0].dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
        );

        expect(focusSpy).toHaveBeenCalled();
      });

      it('should move focus to the previous active link on ArrowLeft', () => {
        const host = fixture.nativeElement as HTMLElement;
        const activeLinks = Array.from(
          host.querySelectorAll<HTMLElement>('a:not(.disabled)')
        );
        activeLinks[1].focus();
        const focusSpy = vi.spyOn(activeLinks[0], 'focus');

        activeLinks[1].dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true })
        );

        expect(focusSpy).toHaveBeenCalled();
      });

      it('should not move focus past the last active link on ArrowRight', () => {
        const host = fixture.nativeElement as HTMLElement;
        const activeLinks = Array.from(
          host.querySelectorAll<HTMLElement>('a:not(.disabled)')
        );
        const last = activeLinks[activeLinks.length - 1];
        last.focus();
        const focusSpy = vi.spyOn(last, 'focus');

        last.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })
        );

        expect(focusSpy).not.toHaveBeenCalled();
      });
    });

    describe('focusedIndex on page change', () => {
      beforeEach(() => {
        // Ensure view is initialised before navigation tests run
        fixture.detectChanges();
      });

      it('should focus the first active item past the old page when navigating forward', async () => {
        // beforeEach set currentPage=1, totalPages=10. Navigate forward to page 3.
        component.pagination = { currentPage: 2, totalPages: 10 };
        // In production the [pagination] @Input propagates through normal Angular CD,
        // marking the component dirty and re-evaluating [cxRovingTabindexInitialIndex].
        // In tests, direct property mutation bypasses that — drive the directive directly.
        const dirDE = fixture.debugElement.query(
          By.directive(CxRovingTabindexDirective)
        );
        const dir = dirDE?.injector.get(CxRovingTabindexDirective);
        if (dir) {
          dir.cxRovingTabindexInitialIndex = (component as any).initialFocusIndex;
        }
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 0));

        const hostEl = fixture.nativeElement as HTMLElement;
        const newActiveLinks = Array.from(
          hostEl.querySelectorAll<HTMLElement>('a:not(.disabled)')
        );
        // Forward from page 2 (prevPage=1): first active item with number > 1
        // Active items include <<(0), <(1), page2(1), page4(3), >(3), >>(9) — first with number>1 is page4 at idx>0
        const focusedIdx = newActiveLinks.findIndex(
          (el) => el.getAttribute('tabindex') === '0'
        );
        expect(focusedIdx).toBeGreaterThan(0);
        newActiveLinks.forEach((el, i) => {
          expect(el.getAttribute('tabindex')).toBe(i === focusedIdx ? '0' : '-1');
        });
      });

      it('should focus the last active item before the old page when navigating backward', async () => {
        // beforeEach set currentPage=1, totalPages=10. Navigate backward to page 1.
        component.pagination = { currentPage: 0, totalPages: 10 };
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(resolve, 0));

        const hostEl = fixture.nativeElement as HTMLElement;
        const newActiveLinks = Array.from(
          hostEl.querySelectorAll<HTMLElement>('a:not(.disabled)')
        );
        // Backward from page 1 (prevPage=1): last active item with number < 1
        // On currentPage=0: >(1), >>(9), page2(1), page3(2) are active; no item has number < 1
        // Falls back to 0 (first active item)
        const focusedIdx = newActiveLinks.findIndex(
          (el) => el.getAttribute('tabindex') === '0'
        );
        expect(focusedIdx).toBe(0);
        newActiveLinks.slice(1).forEach((el) => {
          expect(el.getAttribute('tabindex')).toBe('-1');
        });
      });
    });
  });
});
