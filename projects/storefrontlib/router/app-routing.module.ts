/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
  PlatformLocation,
} from '@angular/common';
import { APP_INITIALIZER, inject, Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOnNavigateConfig } from './config/default-on-navigate-config';
import { OnNavigateService } from './on-navigate.service';

export function myLocationFactory() {
  new Location(inject(LocationStrategy as any));
}

@Injectable({ providedIn: 'root' })
export class MyPathLocationStrategy extends PathLocationStrategy {
  originBaseUrl = 'https://electronics.de';
  platformLocation = inject(PlatformLocation);

  prepareExternalUrl(url: string) {
    const x = super.prepareExternalUrl(url);
    const z = new URL(x, this.originBaseUrl);
    if (!url.startsWith('electronics-spa')) {
      console.log(`preparing url\n  ${url}\n  ${x}\n  ${z}`);
    }
    return z.href;
  }

  override pushState(
    _state: any,
    _title: string,
    url: string,
    queryParams: string
  ) {
    console.log(`pushState\n  ${url}`);
    const externalUrl = this.prepareExternalUrl(
      url + this.normalizeQueryParams(queryParams)
    );

    // this.platformLocation.pushState(state, title, externalUrl);
    window.location.assign(externalUrl);
  }

  override replaceState(
    state: any,
    title: string,
    url: string,
    queryParams: string
  ) {
    console.log(`replaceState\n  ${url}`);
    const externalUrl = super.prepareExternalUrl(
      url + this.normalizeQueryParams(queryParams)
    );
    this.platformLocation.replaceState(state, title, externalUrl);
  }

  normalizeQueryParams(params: string): string {
    return params && params[0] !== '?' ? `?${params}` : params;
  }
}

@Injectable({ providedIn: 'root', useFactory: myLocationFactory })
export class MyLocation extends Location {
  // _basePath: number;

  constructor(l: LocationStrategy) {
    super(l);

    console.log('my location', (this as any)['_basePath']);
  }
}

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking',
    }),
  ],
  providers: [
    { provide: LocationStrategy, useClass: MyPathLocationStrategy },
    // { provide: PathLocationStrategy, useClass: MyPathLocationStrategy },
    { provide: Location, useClass: MyLocation },
    provideDefaultConfig(defaultOnNavigateConfig),
    {
      provide: APP_INITIALIZER,
      useFactory: onNavigateFactory,
      deps: [OnNavigateService],
      multi: true,
    },
  ],
})
export class AppRoutingModule {}

export function onNavigateFactory(
  onNavigateService: OnNavigateService
): () => void {
  const isReady = () => onNavigateService.initializeWithConfig();
  return isReady;
}
