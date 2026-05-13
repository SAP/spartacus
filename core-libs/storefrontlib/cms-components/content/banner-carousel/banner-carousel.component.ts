/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import {
  CmsService,
  ContentSlotComponentData,
  CmsBannerCarouselComponent as model,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure';
import { ComponentWrapperDirective } from '../../../cms-structure/page/component/component-wrapper.directive';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';

/**
 * Generic carousel that renders CMS Components.
 */
@Component({
  selector: 'cx-banner-carousel',
  templateUrl: 'banner-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, CarouselComponent, ComponentWrapperDirective, AsyncPipe],
})
export class BannerCarouselComponent {
  private componentData$: Observable<model> = this.componentData.data$.pipe(
    filter((data) => Boolean(data)),
    tap((d: model) => (this.theme = `${d.effect}-theme`))
  );

  private items$: Observable<Observable<ContentSlotComponentData>[]> =
    this.componentData$.pipe(
      map((data) => data.banners?.trim().split(' ') ?? []),
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
