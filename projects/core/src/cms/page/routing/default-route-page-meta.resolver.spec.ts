import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { TranslationService } from '../../../i18n/translation.service';
import { DefaultRoutePageMetaResolver } from './default-route-page-meta.resolver';

class MockTranslationService implements Partial<TranslationService> {
  translate(key: string): Observable<string> {
    return of(`translated ${key}`);
  }
}

describe('DefaultRouteBreadcrumbResolver', () => {
  let resolver: DefaultRoutePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslationService, useClass: MockTranslationService },
      ],
    });
    resolver = TestBed.inject(DefaultRoutePageMetaResolver);
  });

  describe(`resolveBreadcrumbs`, () => {
    it('should emit breadcrumb with given path and i18n key (as string)', async () => {
      expect(
        await resolver
          .resolveBreadcrumbs({
            url: '/testPath',
            pageMetaConfig: { breadcrumb: 'test.key' },
          })
          .pipe(take(1))
          .toPromise()
      ).toEqual([
        {
          link: '/testPath',
          label: 'translated test.key',
        },
      ]);
    });

    it('should emit breadcrumb with given path and i18n key (as object property)', async () => {
      expect(
        await resolver
          .resolveBreadcrumbs({
            url: '/testPath',
            pageMetaConfig: { breadcrumb: { i18n: 'test.key' } },
          })
          .pipe(take(1))
          .toPromise()
      ).toEqual([
        {
          link: '/testPath',
          label: 'translated test.key',
        },
      ]);
    });

    it('should emit breadcrumb with given path and raw text', async () => {
      expect(
        await resolver
          .resolveBreadcrumbs({
            url: '/testPath',
            pageMetaConfig: { breadcrumb: { raw: 'raw test' } },
          })
          .pipe(take(1))
          .toPromise()
      ).toEqual([
        {
          link: '/testPath',
          label: 'raw test',
        },
      ]);
    });
  });
});
