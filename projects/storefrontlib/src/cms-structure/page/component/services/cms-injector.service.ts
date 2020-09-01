import { Injectable, Injector } from '@angular/core';
import { CmsComponentData } from '../../model/cms-component-data';
import { CmsComponent, CmsService } from '@spartacus/core';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { CombinedInjector } from '../../../../shared/utils/combined-injector';

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

  private getCmsData<T extends CmsComponent>(
    uid: string,
    parentInjector?: Injector
  ): CmsComponentData<T> {
    return {
      uid: uid,
      data$: (parentInjector ?? this.injector)
        .get(CmsService)
        .getComponentData<T>(uid),
    };
  }

  public getInjector(
    type: string,
    uid: string,
    parentInjector?: Injector
  ): Injector {
    const configProviders =
      this.cmsComponentsService.getMapping(type)?.providers ?? [];

    const complementaryInjectors = this.cmsComponentsService.getInjectors(type);

    if (complementaryInjectors?.length) {
      parentInjector = new CombinedInjector(
        parentInjector ?? this.injector,
        complementaryInjectors
      );
    }

    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: this.getCmsData(uid),
        },
        ...configProviders,
      ],
      parent: parentInjector ?? this.injector,
    });
  }
}
