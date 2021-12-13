import { Injectable } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { NavigationService } from 'projects/storefrontlib/cms-components';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotCategoryService {
  constructor(
    protected cmsService: CmsService,
    protected navigationService: NavigationService
  ) {}

  categories$ = this.cmsService.getContentSlot('NavigationBar').pipe(
    switchMap((page) =>
      this.navigationService.getNavigationNode(
        this.cmsService.getComponentData(page?.components[0].uid)
      )
    ),
    pluck('children')
  );
}
