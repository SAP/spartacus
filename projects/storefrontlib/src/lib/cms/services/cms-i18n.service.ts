import { Injectable } from '@angular/core';
import { CmsService, PageContext, TranslationService } from '@spartacus/core';
import { take } from 'rxjs/operators';
import { CmsMappingService } from './cms-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class CmsI18NService {
  constructor(
    private cmsService: CmsService,
    private cmsMapping: CmsMappingService,
    private translationService: TranslationService
  ) {}

  loadNamespaces(pageContext: PageContext) {
    this.cmsService
      .getPageComponentTypes(pageContext)
      .pipe(take(1))
      .subscribe(pageComponents => {
        const namespacesI18N = this.cmsMapping.getNamespacesI18NForComponents(
          pageComponents
        );
        this.translationService.loadNamespaces(namespacesI18N);
      });
  }
}
