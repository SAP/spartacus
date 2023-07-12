/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
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
import { CaptchaProvider, RenderParams } from '../captcha.model';
import { GoogleRecaptchaApiConfig } from './config/google-recaptcha-api-config';

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
export class GoogleRecaptchaV2Service implements CaptchaProvider, OnDestroy {
  protected token: string;
  protected subscription = new Subscription();
  protected captchaConfigSubject$ = new ReplaySubject<CaptchaConfig>(1);

  constructor(
    protected adapter: SiteAdapter,
    protected apiConfig: GoogleRecaptchaApiConfig,
    protected languageService: LanguageService,
    protected scriptLoader: ScriptLoader,
    protected baseSiteService: BaseSiteService
  ) {
    this.initialize();
  }

  /**
   * Retrieve captcha configuration from the backend, and if enabled
   * call @function loadScript with active language
   */
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
          this.loadScript({
            onload: 'onCaptchaLoad',
            render: 'explicit',
            hl: lang,
          });
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

  /**
   * Trigger rendering function configured in GoogleRecaptchaApiConfig
   * @param {HTMLElement} elem - HTML element to render captcha widget within.
   * @param {string} pubKey - public key to be used for the widget
   */
  renderCaptcha(renderParams: RenderParams): Observable<string> {
    const retVal = new Subject<string>();

    // @ts-ignore Global object created when captcha script is loaded
    grecaptcha.render(renderParams.element, {
      sitekey: renderParams.publicKey,
      callback: (response: string) => {
        this.token = response;
        retVal.next(response);
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

  /**
   * Load external script with dependencies to be added to <head>.
   * @param {string} lang - Language used by api in the script
   */
  loadScript(params?: { [key: string]: string }): void {
    if (this.apiConfig?.apiUrl) {
      if (params) {
        this.scriptLoader.embedScript({
          src: this.apiConfig.apiUrl,
          params: params,
          attributes: { type: 'text/javascript' },
        });
      } else {
        this.scriptLoader.embedScript({
          src: this.apiConfig.apiUrl,
          attributes: { type: 'text/javascript' },
        });
      }
    }
  }
}
