/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  CmsService,
  Page,
  FeatureConfigService,
  PointOfService,
  RoutingService,
  useFeatureStyles,
} from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  PointOfServiceNames,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { StoreFinderFacade } from '@spartacus/storefinder/root';
import { ICON_TYPE } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

const GET_DIRECTIONS_NAME = 'Get Directions';
const CHANGE_STORE_NAME = 'Change Store';

interface PreferredStoreContent {
  header: string;
  actions: Array<
    | { event: string; name: string }
    | { link: string; name: string; ariaLabel?: string; target?: string }
  >;
}

@Component({
  selector: 'cx-my-preferred-store',
  templateUrl: 'my-preferred-store.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class MyPreferredStoreComponent implements OnInit {
  preferredStore$: Observable<PointOfService>;
  content: PreferredStoreContent = {
    header: 'My Store',
    actions: [
      { event: 'send', name: GET_DIRECTIONS_NAME },
      { event: 'edit', name: CHANGE_STORE_NAME },
    ],
  };
  openHoursOpen = false;
  readonly ICON_TYPE = ICON_TYPE;
  pointOfService: PointOfService;
  isStoreFinder = false;

  private featureConfigService = inject(FeatureConfigService);
  protected cdr = inject(ChangeDetectorRef, { optional: true });

  constructor(
    private preferredStoreFacade: PreferredStoreFacade,
    protected pickupLocationsSearchService: PickupLocationsSearchFacade,
    protected routingService: RoutingService,
    protected storeFinderService: StoreFinderFacade,
    protected cmsService: CmsService
  ) {
    this.preferredStore$ = this.preferredStoreFacade.getPreferredStore$().pipe(
      filter((preferredStore) => preferredStore !== null),
      map((preferredStore) => preferredStore as PointOfServiceNames),
      filter((preferredStore) => !!preferredStore.name),
      map((preferredStore) => preferredStore.name),
      tap((preferredStoreName) =>
        this.pickupLocationsSearchService.loadStoreDetails(
          preferredStoreName as string
        )
      ),
      switchMap((preferredStoreName) =>
        this.pickupLocationsSearchService.getStoreDetails(
          preferredStoreName as string
        )
      ),
      tap((store: PointOfService) => {
        this.pointOfService = store;
      })
    );

    useFeatureStyles('a11yViewHoursButtonIconContrast');
    useFeatureStyles('a11yImproveButtonsInCardComponent');
  }

  ngOnInit(): void {
    if (
      this.featureConfigService.isEnabled('a11yImproveButtonsInCardComponent')
    ) {
      this.cmsService
        .getCurrentPage()
        .pipe(
          filter<Page>(Boolean),
          take(1),
          map((cmsPage) => {
            this.isStoreFinder = cmsPage.pageId === 'storefinderPage';
            return this.isStoreFinder;
          })
        )
        .subscribe((isStoreFinder) => {
          const link = this.storeFinderService.getDirections(
            this.pointOfService
          );
          if (isStoreFinder) {
            this.content = {
              header: '',
              actions: [
                {
                  link,
                  name: GET_DIRECTIONS_NAME,
                  ariaLabel: 'cardActions.getDirections',
                  target: '_blank',
                },
              ],
            };
          } else {
            this.content = {
              ...this.content,
              actions: [
                {
                  link,
                  name: GET_DIRECTIONS_NAME,
                  ariaLabel: 'cardActions.getDirections',
                  target: '_blank',
                },
                { event: 'edit', name: 'Change Store' },
              ],
            };
          }
          this.cdr?.detectChanges();
        });
    } else {
      this.cmsService
        .getCurrentPage()
        .pipe(
          filter<Page>(Boolean),
          take(1),
          tap(
            (cmsPage) =>
              (this.isStoreFinder = cmsPage.pageId === 'storefinderPage')
          ),
          filter(() => this.isStoreFinder),
          tap(() => {
            this.content = {
              header: '',
              actions: [{ event: 'send', name: GET_DIRECTIONS_NAME }],
            };
          })
        )
        .subscribe();
    }
  }

  /**
   * Toggle whether the store's opening hours are visible.
   */
  toggleOpenHours(): boolean {
    this.openHoursOpen = !this.openHoursOpen;
    return false;
  }

  changeStore(): void {
    this.routingService.go(['/store-finder']);
  }

  getDirectionsToStore(): void {
    const linkToDirections: string = this.storeFinderService.getDirections(
      this.pointOfService
    );
    window.open(linkToDirections, '_blank', 'noopener,noreferrer');
  }
}
