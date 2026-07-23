import { Component, Directive, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  CmsSearchBoxComponent,
  MockTranslatePipe,
  PageType,
  ProductSearchService,
  RouterState,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import { OutletDirective } from '@spartacus/storefront';
import {
  BehaviorSubject,
  delay,
  EMPTY,
  Observable,
  of,
  ReplaySubject,
} from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { MediaComponent } from '../../../shared/components/media/media.component';
import { IconComponent } from '../../misc/icon/icon.component';
import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxComponent } from './search-box.component';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';
import { SearchResults } from './search-box.model';

const mockSearchBoxComponentData: CmsSearchBoxComponent = {
  uid: '001',
  typeCode: 'SearchBoxComponent ',
  modifiedTime: new Date('2017-12-21T18:15:15+0000'),
  name: 'Mock SearchBox',
  displayProductImages: true,
  displayProducts: true,
  displaySuggestions: true,
  container: false,
  maxProducts: 5,
  maxSuggestions: 5,
  minCharactersBeforeRequest: 3,
  waitTimeBeforeRequest: 500,
};

class MockCmsComponentData {
  get data$(): Observable<CmsSearchBoxComponent> {
    return EMPTY;
  }
}

@Component({
  selector: 'cx-icon',
  template: '',
})
class MockCxIconComponent {
  @Input() type;
}

@Component({
  selector: 'cx-media',
  template: '<img>',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
  @Input() alt;
}

@Directive({ selector: '[cxOutlet]' })
class MockOutletDirective implements Partial<OutletDirective> {
  @Input() cxOutlet: string;
  @Input() cxOutletContext: string;
}

@Component({
  selector: 'cx-carousel',
  template: ``,
})
class MockCarouselComponent {
  @Input() items: any;
  @Input() itemWidth: any;
  @Input() template: any;
  @Input() hideIndicators: any;
}
const mockRouterState: RouterState = {
  nextState: undefined,
  state: {
    url: null,
    queryParams: null,
    params: null,
    context: null,
    cmsRequired: null,
  },
  navigationId: null,
};

const routerState$: BehaviorSubject<RouterState> = new BehaviorSubject(
  mockRouterState
);

const PRODUCT_SEARCH_STRING = 'camera';

class MockRoutingService implements Partial<RoutingService> {
  getRouterState = () => routerState$.asObservable();
}

describe('SearchBoxComponent', () => {
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let serviceSpy: SearchBoxComponentService;
  let cmsComponentData: CmsComponentData<CmsSearchBoxComponent>;
  let routingService: RoutingService;

  function getFocusedElement(): HTMLElement {
    return <HTMLElement>document.activeElement;
  }

  class SearchBoxComponentServiceSpy
    implements Partial<SearchBoxComponentService>
  {
    chosenWord = new ReplaySubject<string>();
    sharedEvent = new ReplaySubject<KeyboardEvent>();

    launchSearchPage = vi.fn();
    getResults = vi.fn().mockImplementation(() => {
      const results = {
        suggestions: ['te', 'test'],
        message: 'I found stuff for you!',
        products: [
          {
            name: 'title 1',
          },
        ],
      };
      return of(<SearchResults>results);
    });
    dispatchSuggestionSelectedEvent = vi.fn();
    dispatchProductSelectedEvent = vi.fn();
    search() {}
    toggleBodyClass() {}
    clearResults() {}
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        SearchBoxComponent,
      ],
      providers: [
        {
          provide: ProductSearchService,
          useValue: {},
        },
        {
          provide: CmsComponentData,
          useClass: MockCmsComponentData,
        },
        {
          provide: SearchBoxComponentService,
          useClass: SearchBoxComponentServiceSpy,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
      ],
    })
      .overrideComponent(SearchBoxComponent, {
        remove: {
          imports: [
            TranslatePipe,
            IconComponent,
            MediaComponent,
            OutletDirective,
            CarouselComponent,
          ],
        },
        add: {
          imports: [
            MockTranslatePipe,
            MockCxIconComponent,
            MockMediaComponent,
            MockOutletDirective,
            MockCarouselComponent,
          ],
        },
      })
      .compileComponents();
  });

  describe('Default config', () => {
    beforeEach(() => {
      cmsComponentData = TestBed.inject(CmsComponentData);

      vi.spyOn(cmsComponentData, 'data$', 'get').mockReturnValue(
        of(mockSearchBoxComponentData)
      );

      fixture = TestBed.createComponent(SearchBoxComponent);
      searchBoxComponent = fixture.componentInstance;
      searchBoxComponent.ngOnInit();

      routingService = TestBed.inject(RoutingService);

      serviceSpy = fixture.debugElement.injector.get(
        SearchBoxComponentService
      ) as any;

      vi.spyOn(searchBoxComponent, 'search');
      vi.spyOn(routingService, 'getRouterState');
    });

    it('should be created', () => {
      expect(searchBoxComponent).toBeTruthy();
    });

    it('should initialize subscriptions on initialization', () => {
      vi.spyOn(searchBoxComponent['subscriptions'], 'add');
      vi.spyOn(serviceSpy['chosenWord'], 'subscribe');
      vi.spyOn(serviceSpy['sharedEvent'], 'subscribe');

      searchBoxComponent.ngOnInit();

      expect(routingService.getRouterState).toHaveBeenCalled();
      expect(serviceSpy.chosenWord.subscribe).toHaveBeenCalled();
      expect(serviceSpy.sharedEvent.subscribe).toHaveBeenCalled();
      expect(searchBoxComponent['subscriptions'].add).toHaveBeenCalledTimes(3);
    });

    it('should dispatch new results when search is executed', () => {
      searchBoxComponent.search('testQuery');
      fixture.detectChanges();
      expect(serviceSpy.getResults).toHaveBeenCalled();
    });

    it('should set the queryText and trigger a search', () => {
      fixture.componentRef.setInput('queryText', 'testQuery');

      expect(searchBoxComponent.chosenWord).toBe('testQuery');
      expect(searchBoxComponent.search).toHaveBeenCalledWith('testQuery');
    });

    it('should dispatch new search query on input', () => {
      fixture.componentRef.setInput('queryText', 'test input');

      fixture.detectChanges();
      expect(searchBoxComponent.search).toHaveBeenCalledWith('test input');
    });

    it('should launch the search page, given it is not an empty search', () => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.searchbox input'));
      input.nativeElement.value = PRODUCT_SEARCH_STRING;
      input.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      expect(serviceSpy.launchSearchPage).toHaveBeenCalled();
    });

    it('should not launch search page on empty search', () => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.searchbox input'));
      input.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      expect(serviceSpy.launchSearchPage).not.toHaveBeenCalled();
    });

    it('should always return true for searchBoxV2', () => {
      expect(searchBoxComponent.searchBoxV2).toBe(true);
    });

    it('should always bind the "search-box-v2" class', function () {
      expect(searchBoxComponent.searchBoxV2).toBe(true);
    });

    it('should handle typing, selecting suggestion, and pressing Enter to launch search', () => {
      vi.spyOn(searchBoxComponent, 'launchSearchResult');
      const inputElement = document.createElement('input');
      const mockEventData: SearchBoxSuggestionSelectedEvent = {
        freeText: 'laptop',
        selectedSuggestion: 'laptop',
        searchSuggestions: [{ value: 'laptop' }, { value: 'camileo' }],
      };
      searchBoxComponent.searchInputEl = { nativeElement: inputElement };
      // Simulate typing a query
      searchBoxComponent.search('laptop');

      // Simulate selecting a suggestion
      searchBoxComponent.dispatchSuggestionEvent(mockEventData);

      // Simulate pressing Enter
      searchBoxComponent.launchSearchResult('laptop');
      expect(searchBoxComponent.launchSearchResult).toHaveBeenCalledWith(
        'laptop'
      );
    });

    it('should handle async search result fetching and update the results', async () => {
      vi.useFakeTimers();
      const mockResults = {
        products: [{ name: 'Product 1' }, { name: 'Product 2' }],
      };
      serviceSpy.getResults = vi
        .fn()
        .mockReturnValue(of(mockResults).pipe(delay(1000)));

      let results: any;
      searchBoxComponent.results$.subscribe((res) => (results = res));

      expect(results).toBeUndefined(); // Initially no results
      await vi.advanceTimersByTimeAsync(1000); // Simulate the passage of time for async call
      vi.useRealTimers();
      expect(results.products.length).toBe(2); // Results are fetched after delay
    });

    it('should use setTimeout to delay focus action', () => {
      vi.spyOn(window, 'setTimeout').mockImplementation(() => 0 as any);
      searchBoxComponent.onEscape();
      expect(setTimeout).toHaveBeenCalled();
    });

    it('should return an Observable when breakpointService is available', () => {
      const result = searchBoxComponent.isMobile;
      expect(result).toBeInstanceOf(Observable);
    });

    it('should return 0 when isMobile is false', () => {
      const result = searchBoxComponent.getTabIndex(false);
      expect(result).toBe(0);
    });

    it('should return 0 when isMobile is true and searchBoxActive is true', () => {
      searchBoxComponent.searchBoxActive = true;
      const result = searchBoxComponent.getTabIndex(true);
      expect(result).toBe(0);
    });

    describe('UI tests', () => {
      it('should contain an input text field', () => {
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('input'))).not.toBeNull();
      });

      it('should not contain search results panel', () => {
        expect(fixture.debugElement.query(By.css('.results'))).toBeFalsy();
      });

      it('should contain search results panel after search input', async () => {
        fixture.componentRef.setInput('queryText', 'test input');
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.results'))).toBeTruthy();
      });

      it('should contain a message after search', () => {
        fixture.componentRef.setInput(
          'queryText',

          'te'
        );
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.results h3'));
        expect(el).toBeTruthy();
        expect((<HTMLElement>el.nativeElement).textContent).toEqual(
          'I found stuff for you!'
        );
      });

      it('should clear when clicking on clear button', () => {
        fixture.componentRef.setInput('queryText', 'something');
        fixture.detectChanges();
        const box = fixture.debugElement.query(
          By.css('.searchbox input')
        ).nativeElement;
        box.select();
        fixture.debugElement.query(By.css('.reset')).nativeElement.click();

        expect(box.value).toBe('');
        expect(getFocusedElement()).toBeTruthy();
      });

      it('should not be focusable while hidden on mobile', () => {
        searchBoxComponent.searchBoxActive = false;
        expect(searchBoxComponent.getTabIndex(true)).toBe(-1);
        searchBoxComponent.searchBoxActive = true;
        expect(searchBoxComponent.getTabIndex(true)).toBe(0);
        expect(searchBoxComponent.getTabIndex(false)).toBe(0);
      });

      it('should focus the search input if search box is closed with the escape key press', async () => {
        vi.useFakeTimers();
        fixture.detectChanges();
        searchBoxComponent.searchBoxActive = true;
        const mockSearchInput = fixture.debugElement.query(
          By.css('.searchbox input')
        ).nativeElement;
        vi.spyOn(mockSearchInput, 'focus');

        searchBoxComponent.onEscape();
        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();

        expect(mockSearchInput.focus).toHaveBeenCalled();
      });

      it('should navigate between groups and results with arrow keys', () => {
        const eventDown = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        const eventUp = new KeyboardEvent('keydown', { code: 'ArrowUp' });

        vi.spyOn(searchBoxComponent, 'focusNextChild');
        vi.spyOn(searchBoxComponent, 'focusPreviousChild');

        // Simulate navigating down
        searchBoxComponent['propagateEvent'](eventDown);
        expect(searchBoxComponent.focusNextChild).toHaveBeenCalledWith(
          eventDown
        );

        // Simulate navigating up
        searchBoxComponent['propagateEvent'](eventUp);
        expect(searchBoxComponent.focusPreviousChild).toHaveBeenCalledWith(
          eventUp
        );
      });
    });

    it('should contain carousel after search', () => {
      fixture.componentRef.setInput('queryText', 'te');
      fixture.detectChanges();

      expect(
        fixture.debugElement.queryAll(By.css('.products cx-carousel')).length
      ).toEqual(1);
    });

    it('should contain chosen word from the dropdown', () => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.searchbox input'));
      mockRouterState.state.context = {
        id: 'search',
        type: PageType.CONTENT_PAGE,
      };
      input.nativeElement.value = PRODUCT_SEARCH_STRING;
      input.triggerEventHandler('keydown.enter', {});
      routerState$.next(mockRouterState);
      fixture.detectChanges();
      expect(searchBoxComponent.chosenWord).toEqual(PRODUCT_SEARCH_STRING);
      expect(input.nativeElement.value).toEqual(PRODUCT_SEARCH_STRING);
    });

    it('should clear input when Enter is pressed on a category suggestion', () => {
      // Mock suggestions that include a category
      const mockResults = {
        suggestions: ['Digital Cameras', 'Camera Accessories', 'Lenses'],
        products: [],
      };
      serviceSpy.getResults = vi.fn().mockReturnValue(of(mockResults));

      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.searchbox input'));
      input.nativeElement.value = 'Digital Cameras';

      // Trigger the onEnter method directly
      searchBoxComponent.onEnter('Digital Cameras');

      // Wait for the async operation
      setTimeout(() => {
        expect(searchBoxComponent.chosenWord).toEqual('');
      }, 150);
    });

    it('should not contain searched word when navigating to another page', () => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('.searchbox input'));
      mockRouterState.state.context = null;
      input.nativeElement.value = PRODUCT_SEARCH_STRING;
      input.triggerEventHandler('keydown.enter', {});
      routerState$.next(mockRouterState);

      fixture.detectChanges();
      expect(searchBoxComponent.chosenWord).toEqual('');
      expect(input.nativeElement.value).toEqual('');
    });

    describe('Arrow key tests', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('queryText', 'te');
        fixture.detectChanges();

        // Focus should begin on searchbox input
        const inputSearchBox: HTMLElement = fixture.debugElement.query(
          By.css('.searchbox input')
        ).nativeElement;
        inputSearchBox.focus();
        expect(inputSearchBox).toBe(getFocusedElement());
      });

      describe('focusPreviousGroup', () => {
        it('should prevent default key scrolling', () => {
          const mockEvent = { preventDefault: vi.fn() };

          // Create a mock element with a focus method
          const mockElement = { focus: vi.fn() };

          // Mock getGroupElements to return arrays with mock elements
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[mockElement], ['element2']]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(1);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          // Check that focus was called on the mock element
          expect(mockEvent.preventDefault).toHaveBeenCalled();
          expect(mockElement.focus).toHaveBeenCalled();
        });

        it('should not change focus if there are no groups', () => {
          const mockEvent = { preventDefault: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            []
          ); // No groups
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          const result = searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should not change focus if current group is empty', () => {
          const mockEvent = { preventDefault: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[], ['element2']]
          ); // First group is empty
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          const result = searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should focus on the previous group if valid', () => {
          const mockEvent = { preventDefault: vi.fn() };
          const mockElement = { focus: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[mockElement], ['element2']]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(1);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the previous group
        });

        it('should focus on the first group when current group is the first', () => {
          const mockEvent = { preventDefault: vi.fn() };
          const mockElement = { focus: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[mockElement], ['element2']]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the first group
        });
      });
      describe('focusNextGroup', () => {
        it('should prevent default key scrolling', () => {
          const mockEvent = { preventDefault: vi.fn() };

          // Create a mock element with a focus method
          const mockElement = { focus: vi.fn() };

          // Mock getGroupElements to return arrays with mock elements
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [['element1'], [mockElement]]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0); // First group focused

          searchBoxComponent.focusNextGroup(mockEvent);

          // Check that the default event was prevented and focus was called on the next element
          expect(mockEvent.preventDefault).toHaveBeenCalled();
          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the next group
        });

        it('should not change focus if there are no groups', () => {
          const mockEvent = { preventDefault: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            []
          ); // No groups
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          const result = searchBoxComponent.focusNextGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should not change focus if all groups are empty', () => {
          const mockEvent = { preventDefault: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[], []]
          ); // Both groups are empty
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          const result = searchBoxComponent.focusNextGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should focus on the next group if valid', () => {
          const mockEvent = { preventDefault: vi.fn() };
          const mockElement = { focus: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [['element1'], [mockElement]]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(0);

          searchBoxComponent.focusNextGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the next group
        });

        it('should wrap around and focus on the first group if last group is focused', () => {
          const mockEvent = { preventDefault: vi.fn() };
          const mockElement = { focus: vi.fn() };
          vi.spyOn<any>(searchBoxComponent, 'getGroupElements').mockReturnValue(
            [[mockElement], ['element2']]
          );
          vi.spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).mockReturnValue(1); // Last group

          searchBoxComponent.focusNextGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the first group
        });
      });
    });

    describe('Events', () => {
      it('should dispatch suggestion selected event', () => {
        const mockEventData: SearchBoxSuggestionSelectedEvent = {
          freeText: 'camera',
          selectedSuggestion: 'camera',
          searchSuggestions: [{ value: 'camera' }, { value: 'camileo' }],
        };

        searchBoxComponent.dispatchSuggestionEvent(mockEventData);

        expect(serviceSpy.dispatchSuggestionSelectedEvent).toHaveBeenCalledWith(
          mockEventData
        );
      });
      it('should dispatch product selected event', () => {
        const mockEventData: SearchBoxProductSelectedEvent = {
          freeText: 'camera',
          productCode: '12345',
        };

        searchBoxComponent.dispatchProductEvent(mockEventData);

        expect(serviceSpy.dispatchProductSelectedEvent).toHaveBeenCalledWith(
          mockEventData
        );
      });
    });
  });

  describe('Searchbox config ', () => {
    describe('displayProductImages=false', () => {
      beforeEach(() => {
        cmsComponentData = TestBed.inject(CmsComponentData);

        vi.spyOn(cmsComponentData, 'data$', 'get').mockReturnValue(
          of({
            ...mockSearchBoxComponentData,
            displayProductImages: false,
          })
        );

        fixture = TestBed.createComponent(SearchBoxComponent);
        searchBoxComponent = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should have config', () => {
        expect(searchBoxComponent.config.displayProductImages).toBeFalsy();
      });
    });

    describe('displaySuggestions=false', () => {
      beforeEach(() => {
        cmsComponentData = TestBed.inject(CmsComponentData);

        vi.spyOn(cmsComponentData, 'data$', 'get').mockReturnValue(
          of({
            ...mockSearchBoxComponentData,
            displaySuggestions: false,
          })
        );

        fixture = TestBed.createComponent(SearchBoxComponent);
        searchBoxComponent = fixture.componentInstance;

        fixture.detectChanges();
      });

      it('should have displaySuggestions=false in config', () => {
        expect(searchBoxComponent.config.displaySuggestions).toBeFalsy();
      });
    });
  });
});
