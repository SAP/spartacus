/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  CmsService,
  FeatureConfigService,
  Page,
  PointOfService,
  RoutingService,
  TranslatePipe,
} from '@spartacus/core';
import {
  PickupLocationsSearchFacade,
  PointOfServiceNames,
  PreferredStoreFacade,
} from '@spartacus/pickup-in-store/root';
import { StoreLocationService } from '@spartacus/storefinder/core';
import { StoreFinderFacade } from '@spartacus/storefinder/root';
import { CardComponent, ICON_TYPE, IconComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { StoreAddressComponent } from '../../presentational/store/store-address/store-address.component';
import { StoreScheduleComponent } from '../../presentational/store/store-schedule/store-schedule.component';

const GET_DIRECTIONS_NAME = 'Get Directions';
const CHANGE_STORE_NAME = 'Change Store';
const GET_DIRECTIONS_ARIA = 'cardActions.getDirections';

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
  imports: [
    NgClass,
    CardComponent,
    StoreAddressComponent,
    NgIf,
    IconComponent,
    StoreScheduleComponent,
    AsyncPipe,
    TranslatePipe,
  ],
})
export class MyPreferredStoreComponent implements OnInit {
  protected storeLocationService: StoreLocationService =
    inject(StoreLocationService);
  preferredStore$: Observable<PointOfService>;
  content: PreferredStoreContent | null;
  defaultContent: PreferredStoreContent = {
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
    if (!this.featureConfigService.isEnabled('storeFinderFacadeCleanup')) {
      this.preferredStore$ = this.preferredStoreFacade
        .getPreferredStore$()
        .pipe(
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
    }
  }

  ngOnInit(): void {
    if (this.featureConfigService.isEnabled('storeFinderFacadeCleanup')) {
      this.preferredStore$ = this.preferredStoreFacade
        .getPreferredStore$()
        .pipe(
          filter(
            (preferredStore) =>
              preferredStore !== null && 'name' in preferredStore
          ),
          map((preferredStore) => preferredStore.name),
          distinctUntilChanged(),
          switchMap((preferredStoreName) =>
            this.pickupLocationsSearchService.loadAndGetStoreDetails(
              preferredStoreName as string
            )
          ),
          tap((store: PointOfService) => {
            this.pointOfService = store;
          }),
          shareReplay({ bufferSize: 1, refCount: true })
        );

      this.preferredStore$
        .pipe(
          switchMap(() =>
            this.cmsService.getCurrentPage().pipe(
              filter<Page>(Boolean),
              take(1),
              map((cmsPage) => {
                this.isStoreFinder = cmsPage.pageId === 'storefinderPage';
                return this.isStoreFinder;
              }),
              tap((isStoreFinder) => {
                const link = this.storeLocationService.getDirections(
                  this.pointOfService
                );
                if (isStoreFinder) {
                  this.content = {
                    header: '',
                    actions: [
                      {
                        link,
                        name: GET_DIRECTIONS_NAME,
                        ariaLabel: GET_DIRECTIONS_ARIA,
                        target: '_blank',
                      },
                    ],
                  };
                } else {
                  this.content = {
                    ...this.defaultContent,
                    actions: [
                      {
                        link,
                        name: GET_DIRECTIONS_NAME,
                        ariaLabel: GET_DIRECTIONS_ARIA,
                        target: '_blank',
                      },
                      { event: 'edit', name: CHANGE_STORE_NAME },
                    ],
                  };
                }
                this.cdr?.detectChanges();
              })
            )
          )
        )
        .subscribe();
    } else {
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
                  ariaLabel: GET_DIRECTIONS_ARIA,
                  target: '_blank',
                },
              ],
            };
          } else {
            this.content = {
              ...this.defaultContent,
              actions: [
                {
                  link,
                  name: GET_DIRECTIONS_NAME,
                  ariaLabel: GET_DIRECTIONS_ARIA,
                  target: '_blank',
                },
                { event: 'edit', name: CHANGE_STORE_NAME },
              ],
            };
          }
          this.cdr?.detectChanges();
        });
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
    const linkToDirections = this.featureConfigService.isEnabled(
      'storeFinderFacadeCleanup'
    )
      ? this.storeLocationService.getDirections(this.pointOfService)
      : this.storeFinderService.getDirections(this.pointOfService);
    window.open(linkToDirections, '_blank', 'noopener,noreferrer');
  }
}
