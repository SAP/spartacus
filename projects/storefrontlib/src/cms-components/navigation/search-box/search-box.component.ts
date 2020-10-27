import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Optional,
} from '@angular/core';
import { CmsSearchBoxComponent, WindowRef } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../cms-components/misc/icon/index';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';
import { SearchBoxComponentService } from './search-box-component.service';
import { SearchBoxConfig, SearchResults } from './search-box.model';

const DEFAULT_SEARCHBOX_CONFIG: SearchBoxConfig = {
  minCharactersBeforeRequest: 1,
  displayProducts: true,
  displaySuggestions: true,
  maxProducts: 5,
  maxSuggestions: 5,
  displayProductImages: true,
};

@Component({
  selector: 'cx-searchbox',
  templateUrl: './search-box.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBoxComponent {
  config: SearchBoxConfig;
  /**
   * Sets the search box input field
   */
  @Input('queryText')
  set queryText(value: string) {
    if (value) {
      this.search(value);
    }
  }

  iconTypes = ICON_TYPE;

  /**
   * In some occasions we need to ignore the close event,
   * for example when we click inside the search result section.
   */
  private ignoreCloseEvent = false;

  /**
   * The component data is optional, so that this component
   * can be reused without CMS integration.
   */

  constructor(
    protected searchBoxComponentService: SearchBoxComponentService,
    @Optional()
    protected componentData: CmsComponentData<CmsSearchBoxComponent>,
    protected winRef: WindowRef
  ) {}

  results$: Observable<SearchResults> = this.config$.pipe(
    tap((c) => (this.config = c)),
    switchMap((config) => this.searchBoxComponentService.getResults(config))
  );

  /**
   * Returns the backend configuration or default configuration for the searchbox.
   */
  private get config$(): Observable<SearchBoxConfig> {
    if (this.componentData) {
      return <Observable<SearchBoxConfig>>this.componentData.data$.pipe(
        // Since the backend returns string values (i.e. displayProducts: "true") for
        // boolean values, we replace them with boolean values.
        map((c) => {
          return {
            ...c,
            displayProducts:
              <any>c?.displayProducts === 'true' || c?.displayProducts === true,
            displayProductImages:
              <any>c?.displayProductImages === 'true' ||
              c?.displayProductImages === true,
            displaySuggestions:
              <any>c?.displaySuggestions === 'true' ||
              c?.displaySuggestions === true,
          };
        })
      );
    } else {
      return of(DEFAULT_SEARCHBOX_CONFIG);
    }
  }

  /**
   * Closes the searchbox and opens the search result page.
   */
  search(query: string): void {
    this.searchBoxComponentService.search(query, this.config);
    // force the searchbox to open
    this.open();
  }

  /**
   * Opens the typeahead searchbox
   */
  open(): void {
    this.searchBoxComponentService.toggleBodyClass('searchbox-is-active', true);
  }

  /**
   * Closes the typehead searchbox.
   */
  close(event: UIEvent, force?: boolean): void {
    // Use timeout to detect changes
    setTimeout(() => {
      if ((!this.ignoreCloseEvent && !this.isSearchboxFocused()) || force) {
        this.blurSearchBox(event);
      }
    });
  }

  protected blurSearchBox(event: UIEvent): void {
    this.searchBoxComponentService.toggleBodyClass(
      'searchbox-is-active',
      false
    );
    if (event && event.target) {
      (<HTMLElement>event.target).blur();
    }
  }

  // Check if focus is on searchbox or result list elements
  private isSearchboxFocused(): boolean {
    return (
      this.getResultElements().includes(this.getFocusedElement()) ||
      this.winRef.document.querySelector('input[aria-label="search"]') ===
        this.getFocusedElement()
    );
  }

  /**
   * Especially in mobile we do not want the search icon
   * to focus the input again when it's already open.
   * */
  avoidReopen(event: UIEvent): void {
    if (this.searchBoxComponentService.hasBodyClass('searchbox-is-active')) {
      this.close(event);
      event.preventDefault();
    }
  }

  // Return result list as HTMLElement array
  private getResultElements(): HTMLElement[] {
    return Array.from(
      this.winRef.document.querySelectorAll('.products > a, .suggestions > a')
    );
  }

  // Return focused element as HTMLElement
  private getFocusedElement(): HTMLElement {
    return <HTMLElement>this.winRef.document.activeElement;
  }

  private getFocusedIndex(): number {
    return this.getResultElements().indexOf(this.getFocusedElement());
  }

  // Focus on previous item in results list
  focusPreviousChild(event) {
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
  focusNextChild(event) {
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
}
