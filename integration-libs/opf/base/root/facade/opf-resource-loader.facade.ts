import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { OPF_BASE_FEATURE } from '../feature-name';
import { AfterRedirectDynamicScriptResource } from '../model/opf.model';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: OpfResourceLoaderFacade,
      feature: OPF_BASE_FEATURE,
      methods: [
        'executeScriptFromHtml',
        'clearAllProviderResources',
        'loadProviderResources',
      ],
    }),
})
export abstract class OpfResourceLoaderFacade {
  abstract executeScriptFromHtml(html: string | undefined): void;
  abstract clearAllProviderResources(): void;
  abstract loadProviderResources(
    scripts: AfterRedirectDynamicScriptResource[],
    styles: AfterRedirectDynamicScriptResource[]
  ): Promise<void>;
}
