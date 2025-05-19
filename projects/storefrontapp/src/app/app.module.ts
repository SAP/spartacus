/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { skip, take } from 'rxjs';
import { environment } from '../environments/environment';
import { AuthStorageChannelWorkerService } from './auth-storage-channel-worker.service';
import { AuthStorageDbWorkerService } from './auth-storage-db-worker.service';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@Component({
  selector: 'my-storefront2',
  template: `
    <button (click)="save()">save</button>
    <button (click)="get()">get</button>
    <button (click)="del()">delete</button>
    <input [(ngModel)]="value" />
    <hr />
    <button [disabled]="!db" (click)="mainRetreive()">main get</button>
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class MyStorefront2Component {
  value: string;
  public key = 'authToken';

  db: IDBDatabase;

  constructor(public authStorageDbWorkerService: AuthStorageDbWorkerService) {
    authStorageDbWorkerService.initWorker();

    const dbRequest = indexedDB.open('AuthTokenDB', 1);

    dbRequest.onupgradeneeded = (event) => {
      this.db = (event.target as any).result as IDBDatabase;
      if (!this.db.objectStoreNames.contains('tokens')) {
        this.db.createObjectStore('tokens', { keyPath: 'key' });
      }
    };

    dbRequest.onsuccess = (event) => {
      this.db = (event.target as any).result as IDBDatabase;
      console.log('Main Thread: IndexedDB initialized successfully.');
    };

    dbRequest.onerror = (event) => {
      console.error(
        'Main Thread: Error initializing IndexedDB:',
        (event.target as any).error
      );
    };
  }

  get() {
    this.authStorageDbWorkerService
      .retrieveToken()
      .pipe(skip(1), take(1))
      .subscribe((v) => (this.value = v ?? 'NO_VALUE'));
  }
  save() {
    this.authStorageDbWorkerService.storeToken(this.value);
  }
  del() {
    this.authStorageDbWorkerService.deleteToken();
  }

  mainRetreive() {
    console.log('making request');
    const transaction = this.db.transaction(['tokens'], 'readonly');
    const store = transaction.objectStore('tokens');
    const request = store.get(this.key);

    request.onsuccess = () => {
      console.log({
        status: 'success',
        action: 'getToken',
        value: request.result?.value,
      });
    };

    request.onerror = (event) => {
      console.log({
        status: 'error',
        action: 'getToken',
        error: (event.target as any).error,
      });
    };
  }
}

@Component({
  selector: 'my-storefront',
  template: `
    <button (click)="save()">save</button>
    <button (click)="get()">get</button>
    <button (click)="del()">delete</button>
    <input [(ngModel)]="value" />
  `,
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
})
export class MyStorefrontComponent {
  value: string;
  public key = 'authToken';

  db: IDBDatabase;

  constructor(
    public authStorageChannelWorkerService: AuthStorageChannelWorkerService
  ) {
    authStorageChannelWorkerService.initWorker();
  }

  get() {
    this.authStorageChannelWorkerService
      .retrieveToken()
      .pipe(skip(1), take(1))
      .subscribe((v) => (this.value = v ?? 'NO_VALUE'));
  }
  save() {
    this.authStorageChannelWorkerService.storeToken(this.value);
  }
  del() {
    this.authStorageChannelWorkerService.deleteToken();
  }
}

// @NgModule({
//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     // StoreModule.forRoot({}),
//     // EffectsModule.forRoot([]),
//     // SpartacusModule,
//     // TestOutletModule, // custom usages of cxOutletRef only for e2e testing
//     // TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

//     ...devImports,
//   ],
//   providers: [
//     // provideHttpClient(withFetch(), withInterceptorsFromDi()),
//     // provideConfig(<OccConfig>{
//     //   backend: {
//     //     occ: {
//     //       baseUrl: environment.occBaseUrl,
//     //       prefix: environment.occApiPrefix,
//     //     },
//     //   },
//     // }),
//     // provideConfig(<RoutingConfig>{
//     //   // custom routing configuration for e2e testing
//     //   routing: {
//     //     routes: {
//     //       product: {
//     //         paths: ['product/:productCode/:name', 'product/:productCode'],
//     //         paramsMapping: { name: 'slug' },
//     //       },
//     //     },
//     //   },
//     // }),
//     // provideConfig(<I18nConfig>{
//     //   // we bring in static translations to be up and running soon right away
//     //   i18n: {
//     //     resources: {
//     //       en: translationsEn,
//     //       ja: translationsJa,
//     //       de: translationsDe,
//     //       zh: translationsZh,
//     //     },
//     //     chunks: translationChunksConfig,
//     //     fallbackLang: 'en',
//     //   },
//     // }),
//     // provideConfig({ features: { level: '*' } }), // For the development environment and CI, feature level is always the highest.
//     // provideConfig(<StoreFinderConfig>{
//     //   // For security compliance, by default, google maps does not display.
//     //   // Using special key value 'cx-development' allows google maps to display
//     //   // without a key, for development or demo purposes.
//     //   googleMaps: { apiKey: GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG },
//     // }),
//     AuthStorage2Service,
//     // {
//     //   provide: 'SOMETHING',
//     //   useFactory: (authStorage2Service: AuthStorage2Service) => {
//     //     authStorage2Service.initWorker();
//     //   },
//     //   deps: [AuthStorage2Service],
//     // },
//   ],
//   // import: [MyStorefrontComponent],
//   // declarations: [MyStorefrontComponent],
//   bootstrap: [MyStorefrontComponent],
// })
// export class AppModule {}

bootstrapApplication(MyStorefrontComponent, {
  providers: [],
});
