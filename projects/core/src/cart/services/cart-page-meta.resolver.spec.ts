import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { BasePageMetaResolver, PageRobotsMeta } from '../../cms';
import { I18nTestingModule } from '../../i18n';
import { CartPageMetaResolver } from './cart-page-meta.resolver';

class MockBasePageMetaResolver {
  resolveRobots() {}
  resolveTitle() {
    return of('Shopping Cart');
  }
  resolveDescription() {
    return of();
  }
}

describe('CartPageMetaResolver', () => {
  let service: CartPageMetaResolver;
  let basePageMetaResolver: BasePageMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      providers: [
        {
          provide: BasePageMetaResolver,
          useClass: MockBasePageMetaResolver,
        },
      ],
    });

    service = TestBed.inject(CartPageMetaResolver);
    basePageMetaResolver = TestBed.inject(BasePageMetaResolver);
  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

  it(`should resolve title`, () => {
    let result: string | undefined;

    service
      .resolveTitle()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Shopping Cart');
  });

  it(`should resolve 'Page description' for resolveDescription()`, () => {
    let result: string | undefined;

    spyOn(basePageMetaResolver, 'resolveDescription').and.returnValue(
      of('Page description')
    );

    service
      .resolveDescription()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toEqual('Page description');
  });

  it(`should resolve robots for page data`, () => {
    let result: PageRobotsMeta[] | undefined;

    spyOn(basePageMetaResolver, 'resolveRobots').and.returnValue(
      of([PageRobotsMeta.FOLLOW, PageRobotsMeta.INDEX] as PageRobotsMeta[])
    );

    service
      .resolveRobots()
      .subscribe((meta) => {
        result = meta;
      })
      .unsubscribe();

    expect(result).toContain(PageRobotsMeta.FOLLOW);
    expect(result).toContain(PageRobotsMeta.INDEX);
  });
});
