import { Injectable, Injector } from '@angular/core';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { CmsComponentData } from '../../model/cms-component-data';
import { ComponentDataProvider } from './component-data.provider';

/**
 * Used to prepare injector for CMS components.
 *
 * Injector will take into account configured providers and provides CmsComponentData
 * for specified component's uid
 */
@Injectable({
  providedIn: 'root',
})
export class CmsInjectorService {
  constructor(
    protected cmsComponentsService: CmsComponentsService,
    protected injector: Injector
  ) {}

  public getInjector(
    type: string,
    uid: string,
    parentInjector?: Injector
  ): Injector {
    const configProviders =
      this.cmsComponentsService.getMapping(type)?.providers ?? [];
    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useFactory: (dataProvider: ComponentDataProvider) => ({
            uid,
            data$: dataProvider.get(uid, type),
          }),
          deps: [ComponentDataProvider],
        },
        ...configProviders,
      ],
      parent: parentInjector ?? this.injector,
    });
  }
}
