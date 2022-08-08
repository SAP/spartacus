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

  /**
   * Breadcrumbs of the Account Summary page.
   */
  protected accountSummaryPageBreadcrumb$: Observable<BreadcrumbMeta[]> = defer(
    () => this.routingService.getRouterState()
  ).pipe(
    map((routerState) => routerState?.state?.semanticRoute),
    distinctUntilChanged(),
    switchMap((semanticRoute) => {
      return semanticRoute === 'orgAccountSummary'
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
          this.translation.translate('accountSummary.breadcrumbs.list'),
        ]).pipe(
          map(([orgLabel, _label]) => [
            {
              label: orgLabel,
              link: this.semanticPath.get(this.ORGANIZATION_SEMANTIC_ROUTE),
            },
            {
              label: 'Account Summaries',
              link: this.semanticPath.get('orgAccountSummary'),
            },
          ])
        );
    })
  );

  /**
   * Breadcrumbs returned in the method #resolveBreadcrumbs.
   */
  protected breadcrumbs$: Observable<BreadcrumbMeta[]> = combineLatest([
    this.accountSummaryPageBreadcrumb$,
    defer(() => this.contentPageMetaResolver.resolveBreadcrumbs()),
  ]).pipe(
    map(([accountSummaryPageBreadcrumb, breadcrumbs = []]) => {
      const [home, ...restBreadcrumbs] = breadcrumbs;
      return [home, ...accountSummaryPageBreadcrumb, ...restBreadcrumbs];
    }),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  getScore(page: Page): number {
    return (
      super.getScore(page) +
      (page.label?.startsWith('/organization/account-summary') ? 1 : -1)
    );
  }
}
