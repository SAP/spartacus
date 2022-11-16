/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  BaseSite,
  BaseSiteService,
  CaptchaConfig,
  LanguageService,
  ScriptLoader,
  SiteAdapter,
} from '@spartacus/core';
import {
  forkJoin,
  Observable,
  ReplaySubject,
  Subject,
  Subscription,
} from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { CaptchaApiConfig } from './config/captcha-api-config';

/**
 * Global function to be passes as "onload" url param for captcha <script>, to be
 * triggered once script and dependencies are loaded
 */
declare global {
  interface Window {
    onCaptchaLoad: () => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CaptchaService implements OnDestroy {
  protected token: string;
  protected subscription = new Subscription();

  protected captchaConfigSubject$ = new ReplaySubject<CaptchaConfig>(1);

  constructor(
    protected adapter: SiteAdapter,
    protected apiConfig: CaptchaApiConfig,
    protected languageService: LanguageService,
    protected scriptLoader: ScriptLoader,
    protected baseSiteService: BaseSiteService
  ) {
    this.initialize();
  }

  initialize(): void {
    let captchaConfig: CaptchaConfig;

    this.subscription.add(
      forkJoin([
        this.languageService.getActive().pipe(take(1)),
        this.baseSiteService.getActive().pipe(
          concatMap((value) => this.adapter.loadBaseSite(value)),
          take(1)
        ),
      ]).subscribe((result) => {
        const lang = result[0] as string;
        const baseSite = result[1] as BaseSite;
        if (
          baseSite?.captchaConfig?.enabled &&
          baseSite?.captchaConfig?.publicKey
        ) {
          captchaConfig = baseSite.captchaConfig;
          this.loadScript(lang);
        } else {
          this.captchaConfigSubject$.next({ enabled: false });
        }
      })
    );

    window.onCaptchaLoad = () => {
      this.captchaConfigSubject$.next(captchaConfig);
    };
  }

  getCaptchaConfig(): Observable<CaptchaConfig> {
    return this.captchaConfigSubject$.asObservable();
  }

  renderCaptcha(element: HTMLElement, key: string): Observable<void> {
    const retVal = new Subject<void>();

    // @ts-ignore Global object created when captcha script is loaded
    grecaptcha.render(element, {
      sitekey: key,
      callback: (response: string) => {
        this.token = response;
        retVal.next();
        retVal.complete();
      },
    });

    return retVal.asObservable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getToken(): string {
    return this.token;
  }

  loadScript(lang: string): void {
    if (this.apiConfig?.apiUrl) {
      this.scriptLoader.embedScript({
        src: this.apiConfig.apiUrl,
        params: { onload: 'onCaptchaLoad', render: 'explicit', hl: lang },
        attributes: { type: 'text/javascript' },
      });
    }
  }
}
