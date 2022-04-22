import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  CmsBannerCarouselComponent as model,
  CmsService,
  ContentSlotComponentData,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/index';

/**
 * Generic carousel that renders CMS Components.
 */
@Component({
  selector: 'cx-banner-carousel',
  templateUrl: 'banner-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BannerCarouselComponent {
  private componentData$: Observable<model> = this.componentData.data$.pipe(
    filter(Boolean),
    tap((d: model) => (this.theme = `${d.effect}-theme`))
  );

  private items$: Observable<Observable<ContentSlotComponentData>[]> =
    this.componentData$.pipe(
      map((data) => data.banners.trim().split(' ')),
      map((codes) =>
        codes.map((code) => this.cmsService.getComponentData(code))
      )
    );

  /**
   * Adds a specific theme for the carousel. The effect can be
   * used in CSS customisations.
   */
  @HostBinding('class') theme = '';

  constructor(
    private componentData: CmsComponentData<model>,
    private cmsService: CmsService
  ) {}

  /**
   * Returns an Obervable with an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  getItems(): Observable<Observable<ContentSlotComponentData>[]> {
    return this.items$;
  }
}
