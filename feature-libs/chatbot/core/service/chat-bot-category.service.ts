import { Injectable } from '@angular/core';
import { CmsService, ProductSearchService } from '@spartacus/core';
import { NavigationService } from 'projects/storefrontlib/cms-components';
import { BehaviorSubject } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotCategoryService {
  /**
   * Selected category.
   */
  selected$ = new BehaviorSubject('');

  constructor(
    protected cmsService: CmsService,
    protected navigationService: NavigationService,
    protected productSearchService: ProductSearchService
  ) {}

  /**
   * Gets categoried from CMS Navigation.
   */
  categories$ = this.cmsService.getContentSlot('NavigationBar').pipe(
    switchMap((page) =>
      this.navigationService.getNavigationNode(
        this.cmsService.getComponentData(page?.components[0].uid)
      )
    ),
    pluck('children')
  );

  /**
   * Select given category and perform product search.
   */
  selectCategory(category) {
    this.selected$.next(category);
    this.search();
  }

  /**
   * Perform product search using selected category.
   */
  search() {
    this.productSearchService.search(
      `:relevance:allCategories:${this.getCategoryCode(this.selected$.value)}`
    );
  }

  /**
   * Gets the code for a given category.
   */
  getCategoryCode(category) {
    return category?.url?.split('/c/')?.[1];
  }
}
