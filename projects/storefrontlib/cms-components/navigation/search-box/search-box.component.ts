/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  inject,
} from '@angular/core';
import {
  CmsSearchBoxComponent,
  FeatureConfigService,
  PageType,
  RoutingService,
  WindowRef,
  useFeatureStyles,
} from '@spartacus/core';
import { Observable, Subscription, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { BREAKPOINT, BreakpointService } from '../../../layout/';
import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxFeatures } from './search-box-features.model';
import { SearchBoxOutlets } from './search-box-outlets.model';
import {
  SearchBoxProductSelectedEvent,
  SearchBoxSuggestionSelectedEvent,
} from './search-box.events';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const DEFAULT_SEARCH_BOX_CONFIG: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  displayProducts: true,
  displaySuggestions: true,
  maxProducts: 5,
  maxSuggestions: 5,
  displayProductImages: true,
  recentSearches: true,
  maxRecentSearches: 5,
};
const SEARCHBOX_IS_ACTIVE = 'searchbox-is-active';

@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  readonly searchBoxOutlets = SearchBoxOutlets;
  readonly searchBoxFeatures = SearchBoxFeatures;
  @Input() config: SearchBoxConfig;

  /**
   * Sets the search box input field
   */
  @Input('queryText')
  set queryText(value: string) {
    if (value) {
      this.search(value);
    }
  }

  @ViewChild('searchInput') searchInput: any;

  @ViewChild('searchButton') searchButton: ElementRef<HTMLElement>;

  iconTypes = ICON_TYPE;

  searchBoxActive: boolean = false;

  /**
   * In some occasions we need to ignore the close event,
   * for example when we click inside the search result section.
   */
  private ignoreCloseEvent = false;

  chosenWord = '';

  protected subscriptions = new Subscription();

  get isMobile(): Observable<boolean> | undefined {
    return this.breakpointService?.isDown(BREAKPOINT.sm);
  }

  // TODO: (CXSPA-6929) - Remove getter next major release.
  /** Temporary getter, not ment for public use */
  get a11ySearchBoxMobileFocusEnabled(): boolean {
    return (
      this.featureConfigService?.isEnabled('a11ySearchBoxMobileFocus') || false
    );
  }

  // TODO: (CXSPA-6929) - Make dependencies no longer optional next major release
  @Optional() changeDetecorRef = inject(ChangeDetectorRef, { optional: true });

  @Optional() breakpointService = inject(BreakpointService, { optional: true });

  @Optional() featureConfigService = inject(FeatureConfigService, {
    optional: true,
  });

  constructor(
    protected searchBoxComponentService: SearchBoxComponentService,
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    protected winRef: WindowRef,
    protected routingService: RoutingService
  ) {
    useFeatureStyles('a11ySearchboxLabel');
  }

  /**
   * Returns the SearchBox configuration. The configuration is driven by multiple
   * layers: default configuration, (optional) backend configuration and (optional)
   * input configuration.
   */
  protected config$: Observable<SearchBoxConfig> = (
    this.componentData?.data$ || of({} as any)
  ).pipe(
    map((config) => {
      const isBool = (obj: SearchBoxConfig, prop: string): boolean =>
        obj[prop as keyof SearchBoxConfig] !== 'false' &&
        obj[prop as keyof SearchBoxConfig] !== false;

      return {
        ...DEFAULT_SEARCH_BOX_CONFIG,
        ...config,
        displayProducts: isBool(config, 'displayProducts'),
        displayProductImages: isBool(config, 'displayProductImages'),
        displaySuggestions: isBool(config, 'displaySuggestions'),
        // we're merging the (optional) input of this component, but write the merged
        // result back to the input property, as the view logic depends on it.
        ...this.config,
      };
    }),
    tap((config) => (this.config = config))
  );

  results$: Observable<SearchResults> = this.config$.pipe(
    switchMap((config) => this.searchBoxComponentService.getResults(config))
  );

  ngOnInit(): void {
    const routeStateSubscription = this.routingService
      .getRouterState()
      .pipe(filter((data) => !data.nextState))
      .subscribe((data) => {
        if (
          !(
            data.state.context?.id === 'search' &&
            data.state.context?.type === PageType.CONTENT_PAGE
          )
        ) {
          this.updateChosenWord('');
        }
      });

    this.subscriptions.add(routeStateSubscription);

    const chosenWordSubscription =
      this.searchBoxComponentService.chosenWord.subscribe((chosenWord) => {
        this.updateChosenWord(chosenWord);
      });

    this.subscriptions.add(chosenWordSubscription);

    const UIEventSubscription =
      this.searchBoxComponentService.sharedEvent.subscribe(
        (event: KeyboardEvent) => {
          this.propagateEvent(event);
        }
      );

    this.subscriptions.add(UIEventSubscription);
  }

  /**
   * The Searchbox should not be focusable while not visible.
   */
  getTabIndex(isMobile: boolean | null): number {
    if (isMobile) {
      return this.searchBoxActive ? 0 : -1;
    }
    return 0;
  }

  /**
   * Closes the searchBox and opens the search result page.
   */
  search(query: string): void {
    this.searchBoxComponentService.search(query, this.config);
    // force the searchBox to open
    this.open();
  }

  /**
   * Opens the type-ahead searchBox
   */
  open(): void {
    // TODO: (CXSPA-6929) - Remove feature flag next major release
    if (this.a11ySearchBoxMobileFocusEnabled) {
      if (!this.searchBoxActive) {
        this.searchBoxComponentService.toggleBodyClass(
          SEARCHBOX_IS_ACTIVE,
          true
        );
        this.searchBoxActive = true;
        this.searchInput?.nativeElement.focus();
      }
    } else {
      this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, true);
      this.searchBoxActive = true;
    }
  }

  /**
   * Dispatch UI events for Suggestion selected
   *
   * @param eventData the data for the event
   */
  dispatchSuggestionEvent(eventData: SearchBoxSuggestionSelectedEvent): void {
    this.searchBoxComponentService.dispatchSuggestionSelectedEvent(eventData);
  }

  /**
   * Dispatch UI events for Product selected
   *
   * @param eventData the data for the event
   */
  dispatchProductEvent(eventData: SearchBoxProductSelectedEvent): void {
    this.searchBoxComponentService.dispatchProductSelectedEvent(eventData);
  }

  /**
   * Closes the type-ahead searchBox.
   */
  close(event: UIEvent, force?: boolean): void {
    // Use timeout to detect changes
    setTimeout(() => {
      if ((!this.ignoreCloseEvent && !this.isSearchBoxFocused()) || force) {
        this.blurSearchBox(event);
      }
    });
  }

  protected blurSearchBox(event: UIEvent): void {
    this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, false);
    this.searchBoxActive = false;
    // TODO: (CXSPA-6929) - Remove feature flag next major release
    if (this.a11ySearchBoxMobileFocusEnabled) {
      this.changeDetecorRef?.detectChanges();
      this.searchButton?.nativeElement.focus();
    } else {
      if (event && event.target) {
        (<HTMLElement>event.target).blur();
      }
    }
  }

  // Check if focus is on searchbox or result list elements
  private isSearchBoxFocused(): boolean {
    return (
      this.getResultElements().includes(this.getFocusedElement()) ||
      this.winRef.document.querySelector('input[aria-label="Search"]') ===
        this.getFocusedElement()
    );
  }

  /**
   * Especially in mobile we do not want the search icon
   * to focus the input again when it's already open.
   * */
  avoidReopen(event: UIEvent): void {
    if (this.searchBoxComponentService.hasBodyClass(SEARCHBOX_IS_ACTIVE)) {
      this.close(event);
      event.preventDefault();
    }
  }

  // Return result list as HTMLElement array
  private getResultElements(): HTMLElement[] {
    return Array.from(
      this.winRef.document.querySelectorAll(
        '.products > li a, .suggestions > li a, .recent-searches > li a'
      )
    );
  }

  // Return focused element as HTMLElement
  private getFocusedElement(): HTMLElement {
    return <HTMLElement>this.winRef.document.activeElement;
  }

  updateChosenWord(chosenWord: string): void {
    this.chosenWord = chosenWord;
    if (this.searchInput) {
      this.searchInput.nativeElement.value = this.chosenWord;
    }
  }

  private getFocusedIndex(): number {
    return this.getResultElements().indexOf(this.getFocusedElement());
  }

  private propagateEvent(event: KeyboardEvent) {
    if (event.code) {
      switch (event.code) {
        case 'Escape':
        case 'Enter':
          this.close(event, true);
          return;
        case 'ArrowUp':
          this.focusPreviousChild(event);
          return;
        case 'ArrowDown':
          this.focusNextChild(event);
          return;
        default:
          return;
      }
    } else if (event.type === 'blur') {
      this.close(event);
    }
  }

  // Focus on previous item in results list
  focusPreviousChild(event: UIEvent) {
    event.preventDefault(); // Negate normal keyscroll
    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];
    // Focus on last index moving to first
    if (results.length) {
      if (focusedIndex < 1) {
        results[results.length - 1].focus();
      } else {
        results[focusedIndex - 1].focus();
      }
    }
  }

  // Focus on next item in results list
  focusNextChild(event: UIEvent) {
    this.open();
    event.preventDefault(); // Negate normal keyscroll
    const [results, focusedIndex] = [
      this.getResultElements(),
      this.getFocusedIndex(),
    ];
    // Focus on first index moving to last
    if (results.length) {
      if (focusedIndex >= results.length - 1) {
        results[0].focus();
      } else {
        results[focusedIndex + 1].focus();
      }
    }
  }

  /**
   * Opens the PLP with the given query.
   *
   * TODO: if there's a single product match, we could open the PDP.
   */
  launchSearchResult(event: UIEvent, query: string): void {
    if (!query || query.trim().length === 0) {
      return;
    }
    this.close(event);
    this.searchBoxComponentService.launchSearchPage(query);
  }

  /**
   * Disables closing the search result list.
   */
  disableClose(): void {
    this.ignoreCloseEvent = true;
  }

  preventDefault(ev: UIEvent): void {
    ev.preventDefault();
  }

  /**
   * Clears the search box input field
   */
  clear(el: HTMLInputElement): void {
    this.disableClose();
    el.value = '';
    this.searchBoxComponentService.clearResults();

    // Use Timeout to run after blur event to prevent the searchbox from closing on mobile
    setTimeout(() => {
      // Retain focus on input lost by clicking on icon
      el.focus();
      this.ignoreCloseEvent = false;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
