import { TestBed } from '@angular/core/testing';
import { I18nTestingModule } from '@spartacus/core';
import { Permission } from '@spartacus/organization/administration/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { CurrentPermissionService } from './current-permission.service';
import { PermissionRoutePageMetaResolver } from './permission-route-page-meta.resolver';

const currentItem$: BehaviorSubject<Permission | undefined> =
  new BehaviorSubject(undefined);
class MockCurrentItemService implements Partial<CurrentPermissionService> {
  //item$: Observable<Permission> = of({ code: 'testCode' });
  item$: Observable<Permission | undefined> = currentItem$.asObservable();
}

describe('PermissionRoutePageMetaResolver', () => {
  let resolver: PermissionRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: CurrentPermissionService,
          useClass: MockCurrentItemService,
        },
      ],
    });

    resolver = TestBed.inject(PermissionRoutePageMetaResolver);
  });

  it('should emit breadcrumb with translated i18n key, using current item as params', async () => {
    currentItem$.next({ code: 'testCode' });
    expect(
      await resolver
        .resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
        .pipe(take(1))
        .toPromise()
    ).toEqual([{ label: 'testTranslation code:testCode', link: 'testPath' }]);
  });

  it('should emit breadcrumb with translated i18n key, using {} as params', async () => {
    currentItem$.next(undefined);
    expect(
      await resolver
        .resolveBreadcrumbs({
          url: 'testPath',
          pageMetaConfig: { breadcrumb: { i18n: 'testTranslation' } },
        })
        .pipe(take(1))
        .toPromise()
    ).toEqual([{ label: 'testTranslation', link: 'testPath' }]);
  });
});
