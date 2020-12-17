import { Injectable, Injector } from '@angular/core';
import { CmsComponent, CmsService } from '@spartacus/core';
import { defer } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CmsComponentsService } from '../../../services/cms-components.service';
import { CmsComponentData } from '../../model/cms-component-data';

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
          useFactory: cmsDataFactory(uid, type),
          deps: [CmsComponentsService, CmsService],
        },
        ...configProviders,
      ],
      parent: parentInjector ?? this.injector,
    });
  }
}

function cmsDataFactory<T extends CmsComponent>(uid: string, type: string) {
  return (
    cmsComponentsService: CmsComponentsService,
    cmsService: CmsService
  ) => {
    const data$ = defer(() => {
      const staticComponentData = cmsComponentsService.getStaticData(type);
      if (staticComponentData) {
        return cmsService.getComponentData<T>(uid).pipe(
          map((data) => ({
            ...staticComponentData,
            ...data,
          })),
          startWith(staticComponentData)
        );
      } else {
        return cmsService.getComponentData<T>(uid);
      }
    });

    return {
      uid,
      data$,
    };
  };
}
