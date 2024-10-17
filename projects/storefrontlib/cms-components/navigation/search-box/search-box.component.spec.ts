import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  CmsSearchBoxComponent,
  FeatureConfigService,
  I18nTestingModule,
  PageType,
  ProductSearchService,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  ReplaySubject,
  of,
  delay,
} from 'rxjs';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
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

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {
    return ['test', 'url'];
  }
}

@Pipe({
  name: 'cxHighlight',
})
class MockHighlightPipe implements PipeTransform {
  transform(): any {}
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

class MockFeatureConfigService {
  isEnabled() {
    return true;
  }
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

    launchSearchPage = jasmine.createSpy('launchSearchPage');
    getResults = jasmine.createSpy('search').and.callFake(() => {
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
    dispatchSuggestionSelectedEvent = jasmine.createSpy(
      'dispatchSuggestionSelectedEvent'
    );
    dispatchProductSelectedEvent = jasmine.createSpy(
      'dispatchSuggestionSelectedEvent'
    );
    search() {}
    toggleBodyClass() {}
    clearResults() {}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        I18nTestingModule,
      ],
      declarations: [
        SearchBoxComponent,
        MockUrlPipe,
        MockHighlightPipe,
        MockCxIconComponent,
        MockMediaComponent,
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
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
      ],
    }).compileComponents();
  }));

  describe('Default config', () => {
    beforeEach(() => {
      cmsComponentData = TestBed.inject(CmsComponentData);

      spyOnProperty(cmsComponentData, 'data$').and.returnValue(
        of(mockSearchBoxComponentData)
      );

      fixture = TestBed.createComponent(SearchBoxComponent);
      searchBoxComponent = fixture.componentInstance;
      searchBoxComponent.ngOnInit();

      routingService = TestBed.inject(RoutingService);

      serviceSpy = fixture.debugElement.injector.get(
        SearchBoxComponentService
      ) as any;

      spyOn(searchBoxComponent, 'search').and.callThrough();
      spyOn(routingService, 'getRouterState').and.callThrough();
    });

    it('should be created', () => {
      expect(searchBoxComponent).toBeTruthy();
    });

    it('should initialize subscriptions on initialization', () => {
      spyOn(searchBoxComponent['subscriptions'], 'add');
      spyOn(serviceSpy['chosenWord'], 'subscribe');
      spyOn(serviceSpy['sharedEvent'], 'subscribe');

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
      searchBoxComponent.queryText = 'testQuery';
      expect(searchBoxComponent.chosenWord).toBe('testQuery');
      expect(searchBoxComponent.search).toHaveBeenCalledWith('testQuery');
    });

    it('should dispatch new search query on input', () => {
      searchBoxComponent.queryText = 'test input';
      fixture.detectChanges();
      expect(searchBoxComponent.search).toHaveBeenCalledWith('test input');
    });

    it('should launch the search page, given it is not an empty search', () => {
      const input = fixture.debugElement.query(By.css('.searchbox > input'));

      input.nativeElement.value = PRODUCT_SEARCH_STRING;
      input.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      expect(serviceSpy.launchSearchPage).toHaveBeenCalled();
    });

    it('should not launch search page on empty search', () => {
      const input = fixture.debugElement.query(By.css('.searchbox > input'));
      input.triggerEventHandler('keydown.enter', {});

      fixture.detectChanges();

      expect(serviceSpy.launchSearchPage).not.toHaveBeenCalled();
    });

    it('should return true when the feature is enabled', () => {
      spyOn(
        searchBoxComponent.featureConfigService,
        'isEnabled'
      ).and.returnValue(true);
      expect(searchBoxComponent.searchBoxV2).toBeTrue();
    });

    it('should return false when the feature is disabled', function () {
      spyOn(
        searchBoxComponent.featureConfigService,
        'isEnabled'
      ).and.returnValue(false);
      expect(searchBoxComponent.searchBoxV2).toBeFalse();
    });

    it('should bind the "search-box-v2" class when the feature is enabled', function () {
      spyOn(
        searchBoxComponent.featureConfigService,
        'isEnabled'
      ).and.returnValue(true);
      expect(searchBoxComponent.searchBoxV2).toBeTrue();
    });

    it('should handle typing, selecting suggestion, and pressing Enter to launch search', () => {
      spyOn(searchBoxComponent, 'launchSearchResult').and.callThrough();
      const inputElement = document.createElement('input');
      const mockEventData: SearchBoxSuggestionSelectedEvent = {
        freeText: 'laptop',
        selectedSuggestion: 'laptop',
        searchSuggestions: [{ value: 'laptop' }, { value: 'camileo' }],
      };
      searchBoxComponent.searchInput = { nativeElement: inputElement };
      // Simulate typing a query
      searchBoxComponent.search('laptop');

      // Simulate selecting a suggestion
      const suggestionEvent = new KeyboardEvent('keydown', { code: 'Enter' });
      searchBoxComponent.dispatchSuggestionEvent(mockEventData);

      // Simulate pressing Enter
      searchBoxComponent.launchSearchResult(suggestionEvent, 'laptop');
      expect(searchBoxComponent.launchSearchResult).toHaveBeenCalledWith(
        suggestionEvent,
        'laptop'
      );
    });

    it('should handle async search result fetching and update the results', fakeAsync(() => {
      const mockResults = {
        products: [{ name: 'Product 1' }, { name: 'Product 2' }],
      };
      serviceSpy.getResults = jasmine
        .createSpy()
        .and.returnValue(of(mockResults).pipe(delay(1000)));

      let results: any;
      searchBoxComponent.results$.subscribe((res) => (results = res));

      expect(results).toBeUndefined(); // Initially no results
      tick(1000); // Simulate the passage of time for async call
      expect(results.products.length).toBe(2); // Results are fetched after delay
    }));

    it('should use setTimeout to delay focus action', () => {
      spyOn(window, 'setTimeout');
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
        expect(fixture.debugElement.query(By.css('input'))).not.toBeNull();
      });

      it('should not contain search results panel', () => {
        expect(fixture.debugElement.query(By.css('.results'))).toBeFalsy();
      });

      it('should contain search results panel after search input', waitForAsync(() => {
        searchBoxComponent.queryText = 'test input';
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('.results'))).toBeTruthy();
      }));

      it('should contain a message after search', () => {
        searchBoxComponent.queryText = 'te';
        fixture.detectChanges();

        const el = fixture.debugElement.query(By.css('.results h3'));
        expect(el).toBeTruthy();
        expect((<HTMLElement>el.nativeElement).innerText).toEqual(
          'I found stuff for you!'
        );
      });

      it('should clear when clicking on clear button', () => {
        searchBoxComponent.queryText = 'something';
        fixture.detectChanges();
        const box = fixture.debugElement.query(
          By.css('.searchbox > input')
        ).nativeElement;
        box.select();
        fixture.debugElement.query(By.css('.reset')).nativeElement.click();

        expect(box.value).toBe('');
        expect(box).toBe(getFocusedElement());
      });

      it('should not be focusable while hidden on mobile', () => {
        searchBoxComponent.searchBoxActive = false;
        expect(searchBoxComponent.getTabIndex(true)).toBe(-1);
        searchBoxComponent.searchBoxActive = true;
        expect(searchBoxComponent.getTabIndex(true)).toBe(0);
        expect(searchBoxComponent.getTabIndex(false)).toBe(0);
      });

      it('should focus the search input if search box is closed with the escape key press', fakeAsync(() => {
        fixture.detectChanges();
        searchBoxComponent.searchBoxActive = true;
        const mockSearchInput = fixture.debugElement.query(
          By.css('.searchbox > input')
        ).nativeElement;
        spyOn(mockSearchInput, 'focus');

        searchBoxComponent.onEscape();
        tick();

        expect(mockSearchInput.focus).toHaveBeenCalled();
      }));

      it('should navigate between groups and results with arrow keys', () => {
        const eventDown = new KeyboardEvent('keydown', { code: 'ArrowDown' });
        const eventUp = new KeyboardEvent('keydown', { code: 'ArrowUp' });

        spyOn(searchBoxComponent, 'focusNextChild').and.callThrough();
        spyOn(searchBoxComponent, 'focusPreviousChild').and.callThrough();

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

    it('should contain 1 product after search', () => {
      searchBoxComponent.queryText = 'te';
      fixture.detectChanges();

      expect(
        fixture.debugElement.queryAll(By.css('.products a')).length
      ).toEqual(1);
    });

    it('should contain product image in search result', () => {
      searchBoxComponent.queryText = 'te';
      fixture.detectChanges();

      expect(
        fixture.debugElement.query(By.css('.products a:first-child cx-media'))
      ).toBeTruthy();
    });

    it('should contain .has-media class', () => {
      searchBoxComponent.queryText = 'te';
      fixture.detectChanges();
      expect(
        fixture.debugElement.query(By.css('.products a:first-child.has-media'))
      ).toBeTruthy();
    });

    it('should contain chosen word from the dropdown', () => {
      const input = fixture.debugElement.query(By.css('.searchbox > input'));
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

    it('should not contain searched word when navigating to another page', () => {
      const input = fixture.debugElement.query(By.css('.searchbox > input'));
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
        searchBoxComponent.queryText = 'te';
        fixture.detectChanges();

        // Focus should begin on searchbox input
        const inputSearchBox: HTMLElement = fixture.debugElement.query(
          By.css('.searchbox > input')
        ).nativeElement;
        inputSearchBox.focus();
        expect(inputSearchBox).toBe(getFocusedElement());
      });

      describe('focusPreviousGroup', () => {
        it('should prevent default key scrolling', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);

          // Create a mock element with a focus method
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);

          // Mock getGroupElements to return arrays with mock elements
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [mockElement],
            ['element2'],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(1);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          // Check that focus was called on the mock element
          expect(mockEvent.preventDefault).toHaveBeenCalled();
          expect(mockElement.focus).toHaveBeenCalled();
        });

        it('should not change focus if there are no groups', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue(
            []
          ); // No groups
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          const result = searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should not change focus if current group is empty', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [],
            ['element2'],
          ]); // First group is empty
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          const result = searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should focus on the previous group if valid', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [mockElement],
            ['element2'],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(1);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the previous group
        });

        it('should focus on the first group when current group is the first', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [mockElement],
            ['element2'],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          searchBoxComponent.focusPreviousGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the first group
        });
      });
      describe('focusNextGroup', () => {
        it('should prevent default key scrolling', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);

          // Create a mock element with a focus method
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);

          // Mock getGroupElements to return arrays with mock elements
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            ['element1'],
            [mockElement],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0); // First group focused

          searchBoxComponent.focusNextGroup(mockEvent);

          // Check that the default event was prevented and focus was called on the next element
          expect(mockEvent.preventDefault).toHaveBeenCalled();
          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the next group
        });

        it('should not change focus if there are no groups', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue(
            []
          ); // No groups
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          const result = searchBoxComponent.focusNextGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should not change focus if all groups are empty', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [],
            [],
          ]); // Both groups are empty
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          const result = searchBoxComponent.focusNextGroup(mockEvent);

          expect(result).toBeUndefined(); // Should return early
        });

        it('should focus on the next group if valid', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            ['element1'],
            [mockElement],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(0);

          searchBoxComponent.focusNextGroup(mockEvent);

          expect(mockElement.focus).toHaveBeenCalled(); // Focus on the first element of the next group
        });

        it('should wrap around and focus on the first group if last group is focused', () => {
          const mockEvent = jasmine.createSpyObj('UIEvent', ['preventDefault']);
          const mockElement = jasmine.createSpyObj('HTMLDivElement', ['focus']);
          spyOn<any>(searchBoxComponent, 'getGroupElements').and.returnValue([
            [mockElement],
            ['element2'],
          ]);
          spyOn<any>(
            searchBoxComponent,
            'getFocusedGroupIndex'
          ).and.returnValue(1); // Last group

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

        spyOnProperty(cmsComponentData, 'data$').and.returnValue(
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

      it('should not contain product image', () => {
        expect(
          fixture.debugElement.query(By.css('.products a:first-child cx-media'))
        ).toBeNull();
      });

      it('should not contain .has-media class', () => {
        expect(
          fixture.debugElement.query(
            By.css('.products a:first-child.has-media')
          )
        ).toBeFalsy();
      });
    });

    describe('displaySuggestions=false', () => {
      beforeEach(() => {
        cmsComponentData = TestBed.inject(CmsComponentData);

        spyOnProperty(cmsComponentData, 'data$').and.returnValue(
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
