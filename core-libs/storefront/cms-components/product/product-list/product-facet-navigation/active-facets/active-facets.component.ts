/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  Breadcrumb,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  TranslatePipe,
  TranslationService,
} from '@spartacus/core';
import { EMPTY, Observable, merge } from 'rxjs';
import { pairwise, switchMap, take } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FocusDirective } from '../../../../../layout/a11y/keyboard-focus/focus.directive';
import { IconComponent } from '../../../../misc/icon/icon.component';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';

/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
@Component({
  selector: 'cx-active-facets',
  templateUrl: './active-facets.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    FocusDirective,
    IconComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class ActiveFacetsComponent implements OnInit {
  @HostBinding('attr.role') role = 'group';
  @HostBinding('attr.aria-labelledby') labelledby =
    'cx-active-facets-groupName';

  /** Active facets which are applied to the product results. */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  /** Configurable icon which is used for the active facet close button */
  @Input() closeIcon = ICON_TYPE.CLOSE;

  // DELIBERATELY PRIVATE, to remove easily in the future
  private featureToggles = inject(FeatureToggles);
  protected globalMessageService = inject(GlobalMessageService);
  protected translationService = inject(TranslationService);
  protected destroyRef = inject(DestroyRef);

  constructor(protected facetService: FacetService) {}

  ngOnInit(): void {
    this.subscribeToFacetListAnnouncements();
  }

  getLinkParams(facet: Breadcrumb) {
    return this.facetService.getLinkParams(
      facet.removeQuery?.query?.value ?? ''
    );
  }

  /**
   * The focus key is used to persist the focus on the facet when the DOM is being
   * recreated. We only apply the focus key for the given _active_ facet when there
   * the original facets is not available. This happens for non multi-valued facets.
   *
   * With this approach, the we keep the focus, either at the facet list or on the
   * active facets.
   */
  getFocusKey(facetList: FacetList, facet: Breadcrumb) {
    return facetList.facets?.find((f) =>
      f.values?.find((val) => val.name === facet.facetValueName)
    )
      ? ''
      : facet.facetValueName;
  }

  /**
   * Purpose of this function is to allow keyboard users to click on a filter they
   * wish to remove by pressing spacebar. Event not handled natively by <a> elements.
   *
   * @param event spacebar keydown
   */
  removeFilterWithSpacebar(event?: Event): void {
    event?.preventDefault(); // Avoid spacebar scroll
    event?.target?.dispatchEvent(new MouseEvent('click', { cancelable: true }));
  }

  /**
   * Subscribes to facet list changes and announces added/removed filters to
   * screen readers via the GlobalMessageService assistive message channel.
   */
  protected subscribeToFacetListAnnouncements(): void {
    if (this.featureToggles.a11yFilteredFacetAnnouncement) {
      this.facetList$
        .pipe(
        pairwise(),
        switchMap(([prev, curr]) => {
          const prevNames = new Set(
            prev.activeFacets?.map((f) => f.facetValueName)
          );
          const currNames = new Set(
            curr.activeFacets?.map((f) => f.facetValueName)
          );

          const added = (curr.activeFacets ?? []).filter(
            (f) => !prevNames.has(f.facetValueName)
          );
          const removed = (prev.activeFacets ?? []).filter(
            (f) => !currNames.has(f.facetValueName)
          );

          const toTranslation = (key: string) => (f: Breadcrumb) =>
            this.translationService
              .translate(key, { filter: f.facetValueName })
              .pipe(take(1));

          const translations = [
            ...added.map(toTranslation('productList.filterAdded')),
            ...removed.map(toTranslation('productList.filterRemoved')),
          ];
          return translations.length ? merge(...translations) : EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((msg) =>
        this.globalMessageService.add(msg, GlobalMessageType.MSG_TYPE_ASSISTIVE)
      );
    }
  }
}
