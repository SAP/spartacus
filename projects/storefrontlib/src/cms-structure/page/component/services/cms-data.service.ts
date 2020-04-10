import { Injectable, Injector } from '@angular/core';
import { CmsComponentData } from '../../model';
import { CmsComponent, CmsConfig, CmsService } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class CmsDataService {
  constructor(protected config: CmsConfig, protected injector: Injector) {}

  public getCmsDataForComponent<T extends CmsComponent>(
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

  public getInjectorForComponent(
    type: string,
    uid: string,
    parentInjector?: Injector
  ): Injector {
    // get rid of it
    const configProviders =
      (this.config.cmsComponents[type] || {}).providers || [];
    return Injector.create({
      providers: [
        {
          provide: CmsComponentData,
          useValue: this.getCmsDataForComponent(uid),
        },
        ...configProviders,
      ],
      parent: parentInjector ?? this.injector,
    });
  }
}
