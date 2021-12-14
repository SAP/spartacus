import { Injectable } from '@angular/core';
import { CmsService, ProductSearchService } from '@spartacus/core';
import { NavigationService } from 'projects/storefrontlib/cms-components';
import { BehaviorSubject } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotCategoryService {
  selected$ = new BehaviorSubject('');

  constructor(
    protected cmsService: CmsService,
    protected navigationService: NavigationService,
    protected productSearchService: ProductSearchService
  ) {}

  categories$ = this.cmsService.getContentSlot('NavigationBar').pipe(
    switchMap((page) =>
      this.navigationService.getNavigationNode(
        this.cmsService.getComponentData(page?.components[0].uid)
      )
    ),
    pluck('children')
  );

  selectCategory(category) {
    this.selected$.next(category);
    this.search();
  }

  search() {
    this.productSearchService.search(
      `:relevance:allCategories:${this.getCategoryCode(this.selected$.value)}`
    );
  }

  getCategoryCode(category) {
    return category?.url?.split('/c/')?.[1];
  }
}
