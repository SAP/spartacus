import { TestBed } from '@angular/core/testing';

import { SubscriptionBillingDetailsPageMetaResolver } from './subscription-billing-details-page-meta.resolver';
import { of } from 'rxjs';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  TranslationService,
} from '@spartacus/core';

class MockTranslationService {
  translate(key: string) {
    return of(key);
  }
}

class MockBasePageMetaResolver {
  resolveTitle() {
    return of('Subscription Bill Details');
  }
  resolveDescription() {
    return of('Subscription Bill Description');
  }
}

describe('SubscriptionBillingDetailsPageMetaResolver', () => {
  let service: SubscriptionBillingDetailsPageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });
    service = TestBed.inject(SubscriptionBillingDetailsPageMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should resolve page heading', () => {
    let result: string | undefined;
    service
      .resolveHeading()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('Subscription Bill Details');
  });

  it('should resolve page title', () => {
    let result: string | undefined;
    service
      .resolveTitle()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('Subscription Bill Details');
  });

  it('should resolve page description', () => {
    let result: string | undefined;
    service
      .resolveDescription()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('Subscription Bill Description');
  });

  it('should resolve page breadcrumbs', () => {
    let result: BreadcrumbMeta[] | undefined;
    let breadcrumbs: BreadcrumbMeta[] = [
      { label: 'subscriptionPageBreadcrumb.home', link: '/' },
      {
        label: 'subscriptionPageBreadcrumb.subscriptionBills',
        link: '/my-account/subscription-bills',
      },
    ];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(breadcrumbs);
  });
});
