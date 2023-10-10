/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { HttpParams } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  AsmCustomer360SectionConfig,
  AsmCustomer360StoreLocation,
} from '@spartacus/asm/customer-360/root';
import {
  PointOfService,
  TranslationService,
  WeekdayOpeningDay,
} from '@spartacus/core';
import {
  StoreFinderConfig,
  StoreFinderSearchPage,
  StoreFinderService,
} from '@spartacus/storefinder/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { concatMap, mapTo, take, tap } from 'rxjs/operators';

import { AsmCustomer360SectionContext } from '../asm-customer-360-section-context.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'cx-asm-customer-360-map',
  templateUrl: './asm-customer-360-map.component.html',
})
export class AsmCustomer360MapComponent implements OnDestroy, OnInit {
  storeData: StoreFinderSearchPage;

  googleMapsUrl: SafeResourceUrl;

  selectedStore: PointOfService | undefined;

  apiKey: string;

  dataSource$: Observable<
    [AsmCustomer360SectionConfig, AsmCustomer360StoreLocation]
  >;

  protected subscription = new Subscription();

  constructor(
    public source: AsmCustomer360SectionContext<AsmCustomer360StoreLocation>,
    protected changeDetectorRef: ChangeDetectorRef,
    protected sanitizer: DomSanitizer,
    protected storeFinderService: StoreFinderService,
    protected translationService: TranslationService,
    protected storeFinderConfig: StoreFinderConfig
  ) {}

  ngOnInit(): void {
    this.dataSource$ = combineLatest([this.source.config$, this.source.data$]);

    this.subscription.add(
      this.dataSource$
        .pipe(
          concatMap(([config, data]) => {
            this.storeFinderService.findStoresAction(
              data.address,
              {
                pageSize: config.pageSize,
              },
              undefined,
              undefined,
              undefined,
              this.storeFinderConfig.googleMaps?.radius
            );

            return this.storeFinderService.getFindStoresEntities();
          }),
          concatMap((storeSearchData) => {
            if (storeSearchData) {
              this.storeData = storeSearchData as StoreFinderSearchPage;
              this.selectedStore = this.storeData.stores?.[0];

              return this.updateGoogleMapsUrl();
            } else {
              return of(undefined);
            }
          })
        )
        .subscribe(() => this.changeDetectorRef.detectChanges())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  updateGoogleMapsUrl(): Observable<void> {
    return this.dataSource$.pipe(
      take(1),
      tap(([_, data]) => {
        if (
          this.storeFinderConfig.googleMaps?.apiKey &&
          this.selectedStore?.geoPoint
        ) {
          const coordinates = `${this.selectedStore.geoPoint.latitude},${this.selectedStore.geoPoint.longitude}`;

          const params = new HttpParams()
            .append('key', this.storeFinderConfig.googleMaps?.apiKey)
            .append('origin', data.address)
            .append('destination', coordinates);

          this.googleMapsUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            `https://www.google.com/maps/embed/v1/directions?${params.toString()}`
          );

          this.changeDetectorRef.detectChanges();
        }
      }),
      mapTo(undefined)
    );
  }

  selectStore(store: PointOfService): void {
    this.selectedStore = store;

    this.updateGoogleMapsUrl().subscribe(() =>
      this.changeDetectorRef.detectChanges()
    );
  }

  getStoreOpening(opening: WeekdayOpeningDay): Observable<string> {
    const { closed, openingTime, closingTime } = opening;
    if (closed) {
      return this.translationService.translate(
        'asmCustomer360.maps.storeClosed'
      );
    } else if (openingTime) {
      let storeOpening = `${openingTime.formattedHour}`;

      if (closingTime) {
        storeOpening = `${storeOpening} - ${closingTime.formattedHour}`;
      }

      return of(storeOpening);
    } else {
      return of('');
    }
  }
}
