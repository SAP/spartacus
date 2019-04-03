import { Injectable } from '@angular/core';
import { CmsMappingService } from './cms-mapping.service';
import { TranslationService } from '@spartacus/core';
import { TranslationNamespaceService } from 'projects/core/src/i18n/translation-namespace.service';

@Injectable({
  providedIn: 'root',
})
export class CmsI18nService {
  constructor(
    private cmsMapping: CmsMappingService,
    private translation: TranslationService,
    private translationNamespace: TranslationNamespaceService
  ) {}

  loadNamespacesForComponents(componentTypes: string[]) {
    const i18nKeys = this.cmsMapping.getI18nKeysForComponents(componentTypes);
    const i18nNamespaces = new Set<string>();
    for (const key of i18nKeys) {
      i18nNamespaces.add(this.translationNamespace.getNamespace(key));
    }
    this.translation.loadNamespaces(Array.from(i18nNamespaces));
  }
}
