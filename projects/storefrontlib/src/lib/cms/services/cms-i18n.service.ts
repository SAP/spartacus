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
        const i18nNamespaces = this.cmsMapping.getI18nNamespacesForComponents(
          pageComponents
        );
        this.translationService.loadNamespaces(i18nNamespaces);
      });
  }
}
