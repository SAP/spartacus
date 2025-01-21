/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, OnDestroy } from '@angular/core';
import {
  BaseSiteService,
  CaptchaConfig,
  LanguageService,
  ScriptLoader,
  SiteAdapter,
} from '@spartacus/core';
import { forkJoin, map, Observable, ReplaySubject, Subscription } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';
import { RenderParams } from './captcha.model';
import { CaptchaApiConfig } from './captcha-api-config';
import { CaptchaRenderer } from './captcha.renderer';

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
export abstract class CaptchaService implements CaptchaRenderer, OnDestroy {
  protected token: string;
  protected subscription = new Subscription();
  protected captchaConfigSubject$ = new ReplaySubject<CaptchaConfig>(1);
  protected captchaConfig: CaptchaConfig;

  constructor(
    protected adapter: SiteAdapter,
    protected apiConfig: CaptchaApiConfig,
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
    this.subscription.add(
      this.fetchCaptchaConfigFromServer().subscribe((config) => {
        if (config?.enabled) {
          this.captchaConfig = config;
          this.loadResource();
        } else {
          this.captchaConfigSubject$.next({ enabled: false });
        }
      })
    );
  }

  fetchCaptchaConfigFromServer(): Observable<CaptchaConfig> {
    return forkJoin([
      this.languageService.getActive().pipe(take(1)),
      this.baseSiteService.getActive().pipe(
        concatMap((value) => this.adapter.loadBaseSite(value)),
        take(1)
      ),
    ]).pipe(map((result) => result[1]?.captchaConfig as CaptchaConfig));
  }

  getCaptchaConfig(): Observable<CaptchaConfig> {
    return this.captchaConfigSubject$.asObservable();
  }

  /**
   * Trigger rendering function configured in CaptchaApiConfig
   * @param {HTMLElement} elem - HTML element to render captcha widget within.
   */
  abstract renderCaptcha(renderParams: RenderParams): Observable<string>;

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getToken(): string {
    return this.token;
  }

  /**
   * Load external resource if needed with dependencies to be added to <head>.
   * @param - Language and configuration read from server
   */
  loadResource(): void {
    this.captchaConfigSubject$.next(this.captchaConfig);
  }
}
