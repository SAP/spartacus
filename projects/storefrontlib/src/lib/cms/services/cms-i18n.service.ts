import { Injectable } from '@angular/core';
import { CmsMappingService } from './cms-mapping.service';
import { TranslationService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CmsI18nService {
  constructor(
    private cmsMapping: CmsMappingService,
    private translationService: TranslationService
  ) {}

  loadNamespacesForComponents(componentTypes: string[]) {
    const i18nNamespaces = this.cmsMapping.getI18nNamespacesForComponents(
      componentTypes
    );
    this.translationService.loadNamespaces(i18nNamespaces);
  }
}
