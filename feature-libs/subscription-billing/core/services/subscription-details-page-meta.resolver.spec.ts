import { TestBed } from '@angular/core/testing';

import { SubscriptionDetailsPageMetaResolver } from './subscription-details-page-meta.resolver';
import {
  BasePageMetaResolver,
  BreadcrumbMeta,
  TranslationService,
} from '@spartacus/core';
import { of } from 'rxjs';

class MockTranslationService {
  translate(key: string) {
    return of(key);
  }
}

class MockBasePageMetaResolver {
  resolveTitle() {
    return of('Subscription Details');
  }
  resolveDescription() {
    return of('Subscription Description');
  }
}
describe('SubscriptionDetailsPageMetaResolver', () => {
  let service: SubscriptionDetailsPageMetaResolver;

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
    service = TestBed.inject(SubscriptionDetailsPageMetaResolver);
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

    expect(result).toEqual('Subscription Details');
  });

  it('should resolve page title', () => {
    let result: string | undefined;
    service
      .resolveTitle()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('Subscription Details');
  });

  it('should resolve page description', () => {
    let result: string | undefined;
    service
      .resolveDescription()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual('Subscription Description');
  });

  it('should resolve page breadcrumbs', () => {
    let result: BreadcrumbMeta[] | undefined;
    let breadcrumbs: BreadcrumbMeta[] = [
      { label: 'subscriptionPageBreadcrumb.home', link: '/' },
      {
        label: 'subscriptionPageBreadcrumb.subscriptions',
        link: '/my-account/subscriptions',
      },
    ];
    service
      .resolveBreadcrumbs()
      .subscribe((value) => (result = value))
      .unsubscribe();

    expect(result).toEqual(breadcrumbs);
  });
});
