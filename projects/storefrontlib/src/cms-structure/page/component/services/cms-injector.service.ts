import { Injectable, Injector } from '@angular/core';
import { CmsComponentData } from '../../model';
import { CmsComponent, CmsService } from '@spartacus/core';
import { CmsMappingService } from '../../../services/cms-mapping.service';

@Injectable({
  providedIn: 'root',
})
export class CmsInjectorService {
  constructor(
    protected cmsMapping: CmsMappingService,
    protected injector: Injector
  ) {}

  private getCmsDataForComponent<T extends CmsComponent>(
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
    const configProviders =
      this.cmsMapping.getComponentMapping(type)?.providers ?? [];
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
