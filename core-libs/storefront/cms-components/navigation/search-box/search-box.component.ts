/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CmsSearchBoxComponent,
  FeatureConfigService,
  FeatureDirective,
  PageType,
  RoutingService,
  TranslatePipe,
  UrlPipe,
  useFeatureStyles,
  WindowRef,
} from '@spartacus/core';
import { Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  filter,
  first,
  map,
  switchMap,
  tap,
  timeout,
} from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { OutletDirective } from '../../../cms-structure/outlet/outlet.directive';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { BREAKPOINT, BreakpointService } from '../../../layout/';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { MediaComponent } from '../../../shared/components/media/media.component';
import { IconComponent } from '../../misc/icon/icon.component';
import { HighlightPipe } from './highlight.pipe';
import { SearchBoxComponentService } from './search-box-component.service';
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
  trendingSearches: true,
  maxTrendingSearches: 5,
};
const SEARCHBOX_IS_ACTIVE = 'searchbox-is-active';

@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    NgIf,
    NgFor,
    RouterLink,
    OutletDirective,
    MediaComponent,
    CarouselComponent,
    AsyncPipe,
    UrlPipe,
    TranslatePipe,
    HighlightPipe,
    FeatureDirective,
  ],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private readonly featureConfigService = inject(FeatureConfigService);
  readonly searchBoxOutlets = SearchBoxOutlets;
  @Input() config: SearchBoxConfig;

  /**
   * Sets the search box input field
   */
  @Input('queryText')
  set queryText(value: string) {
    if (value) {
      this.updateChosenWord(value);
      this.search(value);
    }
  }

  @HostBinding('class.search-box-v2') get searchBoxV2() {
    return true;
  }

  /**
   * Listener for clickout out of searchInput and searchPanel
   * */
  @HostListener('document:click', ['$event'])
  clickout(event: UIEvent) {
    const target = event.target as HTMLElement;
    const contains = this.elementRef.nativeElement.contains(target);

    if (!contains) {
      this.softClose();
    }
  }

  /**
   * Handler for clicks on the results div
   * Closes the search box, but ignores clicks on close buttons
   */
  protected handleResultsClick(_event: MouseEvent): void {
    this.close(true);
  }

  @ViewChild('searchInput') searchInputEl: any;

  @ViewChild('searchButton') searchButton: ElementRef<HTMLElement>;

  @HostListener('keydown.escape')
  onEscape() {
    if (
      this.winRef.document.activeElement !==
        this.searchInputEl?.nativeElement ||
      this.searchBoxActive
    ) {
      setTimeout(() => {
        this.searchInputEl.nativeElement.focus();
      });
    }
  }

  iconTypes = ICON_TYPE;

  searchBoxActive: boolean = false;

  /**
   * In some occasions we need to ignore the close event,
   * for example when we click inside the search result section.
   */
  private ignoreCloseEvent = false;

  chosenWord = '';

  /**
   * Tracks whether the search box currently has a non-empty query.
   * Used with searchBoxRecentSearchesRemoval to decide if results should be rendered.
   */
  protected hasQuery = false;

  /**
   * Whether the results panel should be visible for the current state.
   * When searchBoxRecentSearchesRemoval is disabled, matches develop behavior.
   */
  isResultsPanelVisible(): boolean {
    if (!this.searchBoxRecentSearchesRemovalEnabled) {
      return true;
    }
    return this.hasQuery;
  }

  protected getAriaControls(): string | null {
    if (!this.searchBoxRecentSearchesRemovalEnabled) {
      return 'results';
    }
    return this.hasQuery ? 'results' : null;
  }

  /**
   * Cached flag indicating if the current viewport is mobile (BREAKPOINT.sm and below).
   * Used to vary behavior between mobile and desktop.
   */
  protected isMobileState: boolean | null = null;

  private readonly searchBoxRecentSearchesRemovalEnabled =
    this.featureConfigService.isEnabled('searchBoxRecentSearchesRemoval');

  /**
   * Returns true when the current results represent a \"no results\" state.
   * Used to hide recent searches when there are no suggestions or products.
   */
  isNoResults(result: SearchResults | null | undefined): boolean {
    if (!result) {
      return false;
    }
    const hasSuggestions = (result.suggestions?.length ?? 0) > 0;
    const hasProducts = (result.products?.length ?? 0) > 0;
    return !hasSuggestions && !hasProducts;
  }

  protected subscriptions = new Subscription();

  get isMobile(): Observable<boolean> | undefined {
    return this.breakpointService.isDown(BREAKPOINT.sm);
  }

  protected breakpointService = inject(BreakpointService);
  protected changeDetectorRef = inject(ChangeDetectorRef);

  constructor(
    protected searchBoxComponentService: SearchBoxComponentService,
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    protected winRef: WindowRef,
    protected routingService: RoutingService
  ) {
    useFeatureStyles('searchBoxRecentSearchesRemoval');
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

  items$: Observable<any> = this.results$.pipe(
    map((result) => result.products?.map((prod) => of(prod)))
  );

  ngOnInit(): void {
    const configSubscription = this.config$.subscribe();
    this.subscriptions.add(configSubscription);

    if (this.searchBoxRecentSearchesRemovalEnabled) {
      const isMobile$ = this.isMobile;
      if (isMobile$) {
        const isMobileSubscription = isMobile$.subscribe(
          (isMobile) => (this.isMobileState = isMobile ?? false)
        );
        this.subscriptions.add(isMobileSubscription);
      }
    }

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
    if (this.searchBoxRecentSearchesRemovalEnabled) {
      const trimmedQuery = query?.trim() ?? '';

      if (!trimmedQuery) {
        this.hasQuery = false;
        this.searchBoxComponentService.clearResults();
        this.close(true);
        return;
      }

      this.hasQuery = true;
      this.searchBoxComponentService.search(trimmedQuery, this.config);
      this.checkOuterResults();
      this.open();
      return;
    }

    this.searchBoxComponentService.search(query, this.config);
    this.checkOuterResults();
    this.open();
  }

  /**
   * Opens the type-ahead searchBox
   */
  open(): void {
    if (!this.searchBoxActive) {
      if (this.searchBoxRecentSearchesRemovalEnabled) {
        const inputValue = this.searchInputEl?.nativeElement?.value ?? '';
        const trimmed = inputValue.trim();

        // On desktop, do not open results when there is no query.
        // On mobile, always allow opening to show the panel.
        if (this.isMobileState === false && !trimmed) {
          return;
        }
      }

      this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, true);
      this.searchBoxActive = true;
      this.searchInputEl?.nativeElement.focus();
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
   * Blur handler for the search input and suggestion links.
   * Uses feature-specific logic when searchBoxRecentSearchesRemoval is enabled.
   */
  onSearchBlur(event: FocusEvent): void {
    if (this.searchBoxRecentSearchesRemovalEnabled) {
      this.handleInputBlur(event);
    } else {
      this.close();
    }
  }

  /**
   * Click handler for the results panel.
   * Uses feature-specific logic when searchBoxRecentSearchesRemoval is enabled.
   */
  onResultsPanelClick(event: MouseEvent): void {
    if (this.searchBoxRecentSearchesRemovalEnabled) {
      this.handleResultsClick(event);
    } else {
      this.close(true);
    }
  }

  /**
   * Handles blur event on the search input
   * Prevents closing if the blur is caused by clicking the clear recent searches button
   */
  protected handleInputBlur(event: FocusEvent): void {
    const relatedTarget = event.relatedTarget as HTMLElement;

    // If focus is moving to an element within the search box host, don't close
    if (
      relatedTarget &&
      this.elementRef.nativeElement.contains(relatedTarget)
    ) {
      return;
    }

    this.close();
  }

  /**
   * Closes the type-ahead searchBox.
   */
  close(force: boolean = false): void {
    // Use timeout to detect changes
    setTimeout(() => {
      if ((!this.ignoreCloseEvent && !this.isSearchBoxFocused()) || force) {
        this.blurSearchBox();
      }
    });
  }

  softClose(): void {
    this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, false);
    this.searchBoxActive = false;
  }

  protected blurSearchBox(): void {
    this.softClose();
    this.searchBoxComponentService.toggleBodyClass(SEARCHBOX_IS_ACTIVE, false);
    this.searchBoxActive = false;
    this.changeDetectorRef.detectChanges();
    this.searchButton?.nativeElement.focus();
  }

  // Check if focus is on searchbox or result list elements
  private isSearchBoxFocused(): boolean {
    return (
      this.getResultElements().includes(this.getFocusedElement()) ||
      this.winRef.document.querySelector('input[aria-label="Search"]') ===
        this.getFocusedElement()
    );
  }

  protected checkOuterResults() {
    const recentSearches = this.elementRef.nativeElement.querySelector(
      'cx-recent-searches .recent-searches'
    );
    const trendingSearches = this.elementRef.nativeElement.querySelector(
      'cx-trending-searches .trending-searches'
    );
    const results = this.elementRef.nativeElement.querySelector('.results');
    if (recentSearches || trendingSearches) {
      this.renderer.addClass(results, 'has-outer-results');
    }
  }

  /**
   * Especially in mobile we do not want the search icon
   * to focus the input again when it's already open.
   * */
  avoidReopen(event: UIEvent): void {
    if (this.searchBoxComponentService.hasBodyClass(SEARCHBOX_IS_ACTIVE)) {
      this.close();
      event.preventDefault();
    }
  }

  // Return result list as HTMLElement array
  protected getResultElements(): HTMLElement[] {
    return Array.from(
      this.winRef.document.querySelectorAll(
        `.products ul:not(.hidden) > li a, .suggestions ul  > li a, .recent-searches ul > li a, .trending-searches ul > li a, .carousel-panel .item.active > a, .products .carousel-panel > button:not([disabled])`
      )
    );
  }

  // Return group list as HTMLElement array
  private getGroupElements(): HTMLElement[][] {
    const groups: HTMLElement[][] = [];
    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll(
          '.products ul:not(.hidden) > li a'
        )
      )
    );
    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll('.suggestions ul  > li a')
      )
    );
    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll(
          '.trending-searches-container.d-block .trending-searches ul > li a'
        )
      )
    );
    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll('.recent-searches ul > li a')
      )
    );

    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll(
          '.carousel-panel .item.active > a, .carousel-panel > button:not([disabled])'
        )
      )
    );
    groups.push(
      Array.from(
        this.winRef.document.querySelectorAll('.search-panel-close-btn')
      )
    );
    return groups.filter((group) => group.length);
  }
  // Return focused element as HTMLElement
  protected getFocusedElement(): HTMLElement {
    return <HTMLElement>this.winRef.document.activeElement;
  }

  updateChosenWord(chosenWord: string): void {
    this.chosenWord = chosenWord;
    if (this.searchInputEl) {
      this.searchInputEl.nativeElement.value = this.chosenWord;
    }
  }

  protected getFocusedIndex(): number {
    return this.getResultElements().indexOf(this.getFocusedElement());
  }

  protected getFocusedGroupIndex(): number {
    return (
      this.getGroupElements().findIndex(
        (group) => group.indexOf(this.getFocusedElement()) !== -1
      ) ?? 0
    );
  }

  protected propagateEvent(event: KeyboardEvent) {
    if (!this.searchBoxRecentSearchesRemovalEnabled) {
      this.propagateEventLegacy(event);
      return;
    }

    if (event.type === 'blur') {
      this.close();
      return;
    }

    if (!event.code) {
      return;
    }

    this.handleKeyboardEvent(event);
  }

  /**
   * Keyboard/blur handling when searchBoxRecentSearchesRemoval is disabled (develop behavior).
   */
  protected propagateEventLegacy(event: KeyboardEvent): void {
    if (event.code) {
      this.handleKeyboardEvent(event);
      return;
    }

    if (event.type === 'blur') {
      this.close();
    }
  }

  protected handleKeyboardEvent(event: KeyboardEvent): void {
    switch (event.code) {
      case 'Escape':
        this.close(true);
        break;
      case 'Enter':
        this.close(true);
        break;
      case 'ArrowUp':
        this.focusPreviousChild(event);
        break;
      case 'ArrowDown':
        this.focusNextChild(event);
        break;
      case 'ArrowLeft':
        this.focusPreviousGroup(event);
        break;
      case 'ArrowRight':
        this.focusNextGroup(event);
        break;
      default:
        break;
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
      this.winRef.document
        .querySelector('header')
        ?.classList.remove('mouse-focus');
      if (focusedIndex >= results.length - 1) {
        results[0].focus();
      } else {
        results[focusedIndex + 1].focus();
      }
    }
  }

  // Focus on previous item in results list
  focusPreviousGroup(event: UIEvent) {
    event.preventDefault(); // Prevent default key scrolling behavior

    const results = this.getGroupElements(); // Get all group elements
    const focusedGroupIndex = this.getFocusedGroupIndex(); // Get the currently focused group index

    // Check if there are any groups and if the focused index is valid
    if (
      !results.length ||
      focusedGroupIndex < 0 ||
      focusedGroupIndex >= results.length
    ) {
      return; // Exit if no groups or invalid focused index
    }

    // Check if the current group contains any elements
    const currentGroup = results[focusedGroupIndex];
    if (currentGroup.length === 0) {
      return; // If the current group is empty, exit the function
    }

    // Set focus on the appropriate group
    const previousGroupIndex =
      focusedGroupIndex > 0 ? focusedGroupIndex - 1 : 0;
    const previousGroup = results[previousGroupIndex];

    // Check if the previous group contains any elements
    if (previousGroup.length > 0) {
      previousGroup[0].focus(); // Focus on the first element of the previous group
    }
  }

  // Focus on next item in results list
  focusNextGroup(event: UIEvent) {
    this.open(); // Ensure the dropdown or UI is open before navigating
    event.preventDefault(); // Prevent default key scrolling behavior

    const results = this.getGroupElements(); // Get all group elements
    const focusedGroupIndex = this.getFocusedGroupIndex(); // Get the current focused group index

    // Check if there are any groups and if the focused index is valid
    if (
      !results.length ||
      focusedGroupIndex < 0 ||
      focusedGroupIndex >= results.length
    ) {
      return; // Exit if no groups or invalid focused index
    }

    // Find the next group that contains elements
    let nextGroupIndex = focusedGroupIndex + 1;

    // Loop forward through groups until a non-empty group is found
    while (
      nextGroupIndex < results.length &&
      results[nextGroupIndex].length === 0
    ) {
      nextGroupIndex++; // Keep moving to the next group if current one is empty
    }

    // If no next group with elements was found, wrap around to the first group
    if (nextGroupIndex >= results.length) {
      nextGroupIndex = 0; // Move focus to the first group
      if (results[nextGroupIndex].length === 0) {
        return; // Exit if the first group is also empty
      }
    }

    // Set focus on the first element of the next (or first) non-empty group
    results[nextGroupIndex][0].focus();
  }

  carouselEventPropagator(event: KeyboardEvent | null) {
    if (!event || !event?.code) {
      return;
    }
    switch (event.code) {
      case 'ArrowRight':
        this.focusNextChild(event);
        return;
      case 'ArrowLeft': {
        this.getGroupElements().forEach((group) => {
          if (group.indexOf(this.getFocusedElement()) !== -1) {
            if (group.indexOf(this.getFocusedElement()) === 0) {
              this.focusPreviousGroup(event);
            } else {
              this.focusPreviousChild(event);
            }
          }
        });

        return;
      }
      case 'ArrowUp':
        this.focusNextGroup(event);
        return;
      default:
        return;
    }
  }

  /**
   * Opens the PLP with the given query.
   *
   * TODO: if there's a single product match, we could open the PDP.
   */
  launchSearchResult(query: string): void {
    if (!query || query.trim().length === 0) {
      return;
    }
    this.close();
    this.searchBoxComponentService.launchSearchPage(query);
  }

  /**
   * Handler for Enter key from the input. Mirrors the previous template inline calls
   * but checks if the query matches a category suggestion and clears input if so.
   */
  onEnter(value: string): void {
    if (!value || value.trim().length === 0) {
      return;
    }

    const trimmedValue = value.trim();

    // Check if the entered value matches any current suggestions (including categories)
    // Wait for results that actually have suggestions loaded with timeout and fallback
    const enterSubscription = this.results$
      .pipe(
        filter(
          (result) =>
            !!(result && result.suggestions && result.suggestions.length > 0)
        ),
        first(),
        timeout(1000), // 1 second timeout to prevent hanging
        catchError(() => of({ suggestions: [] }))
      )
      .subscribe((result) => {
        const suggestions = result.suggestions ?? [];
        const isCategoryMatch = suggestions.some(
          (suggestion) =>
            suggestion.toLowerCase() === trimmedValue.toLowerCase()
        );

        this.close(true);
        this.launchSearchResult(trimmedValue);
        this.updateChosenWord(trimmedValue);

        // Clear input if it matches a category suggestion
        if (isCategoryMatch) {
          setTimeout(() => {
            this.updateChosenWord('');
          }, 150);
        }
      });

    this.subscriptions.add(enterSubscription);
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
    if (this.searchBoxRecentSearchesRemovalEnabled) {
      this.hasQuery = false;
    }
    this.searchBoxComponentService.clearResults();

    // Use Timeout to run after blur event to prevent the searchbox from closing on mobile
    setTimeout(() => {
      // Retain focus on input lost by clicking on icon
      el.focus();
      this.ignoreCloseEvent = false;
    });
  }

  /**
   * Component cleanup
   */
  ngOnDestroy(): void {
    this.subscriptions?.unsubscribe();
  }
}
