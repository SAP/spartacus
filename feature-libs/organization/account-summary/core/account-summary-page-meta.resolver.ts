/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import {
  BreadcrumbMeta,
  ContentPageMetaResolver,
  Page,
  RoutingService,
  SemanticPathService,
  TranslationService,
} from '@spartacus/core';
import { OrganizationPageMetaResolver } from '@spartacus/organization/administration/core';
import { combineLatest, defer, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';

export const ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY =
  'orgAccountSummaryList.breadcrumbs.list';

@Injectable({
  providedIn: 'root',
})
export class AccountSummaryPageMetaResolver extends OrganizationPageMetaResolver {
  constructor(
    protected contentPageMetaResolver: ContentPageMetaResolver,
    protected translation: TranslationService,
    protected semanticPath: SemanticPathService,
    protected routingService: RoutingService
  ) {
    super(contentPageMetaResolver, translation, semanticPath, routingService);
  }

  protected readonly ACCOUNT_SUMMARY_SEMANTIC_ROUTE = 'orgAccountSummary';
  protected readonly ACCOUNT_SUMMARY_LIST_LABEL = 'Account Summaries';
  protected readonly ACCOUNT_SUMMARY_LIST_PATH =
    '/organization/account-summary';

  /**
   * Breadcrumbs of the Account Summary page.
   */
  protected orgAccountSummaryBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(
    () => this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) => {
      return semanticRoute === this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE
        ? this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY).pipe(
            map((label) => [
              {
                label,
                link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
              },
            ])
          )
        : combineLatest([
            this.translation.translate(this.ORGANIZATION_TRANSLATION_KEY),
            this.translation.translate(ACCOUNT_SUMMARY_LIST_TRANSLATION_KEY),
          ]).pipe(
            map(([orgLabel, _label]) => [
              {
                label: orgLabel,
                link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
              },
              {
                label: this.ACCOUNT_SUMMARY_LIST_LABEL,
                link: this.semanticPath.get(
                  this.ACCOUNT_SUMMARY_SEMANTIC_ROUTE
                ),
              },
            ])
          );
    })
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.orgAccountSummaryBreadcrumb$,
    defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([orgAccountSummaryBreadcrumb, breadcrumbs = []]) => {
      const [home, ...restBreadcrumbs] = breadcrumbs;
      return [home, ...orgAccountSummaryBreadcrumb, ...restBreadcrumbs];
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getScore(page: Page): number {
    return (
      super.getScore(page) +
      (page.label?.startsWith(this.ACCOUNT_SUMMARY_LIST_PATH) ? 1 : -1)
    );
  }
}
