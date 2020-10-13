import { TestBed } from '@angular/core/testing';
import { Address, I18nTestingModule } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentUnitAddressService } from '../links/addresses/services/current-unit-address.service';
import { UnitAddressRoutePageMetaResolver } from './unit-address-route-page-meta.resolver';

class MockCurrentItemService implements Partial<CurrentUnitAddressService> {
  item$: Observable<Address> = of({ formattedAddress: 'testAddress' });
}

describe('UnitAddressRoutePageMetaResolver', () => {
  let resolver: UnitAddressRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentUnitAddressService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(UnitAddressRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    expect(
      await resolver
        .resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
        .pipe(take(1))
        .toPromise()
    ).toEqual([
      {
        label: 'testTranslation formattedAddress:testAddress',
        link: 'testPath',
      },
    ]);
  });
});
