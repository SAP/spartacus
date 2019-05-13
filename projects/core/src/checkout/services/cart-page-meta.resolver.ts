import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CartService } from '../../cart/facade/cart.service';
import { CmsService } from '../../cms/facade/cms.service';
import { Page, PageMeta, PageRobotsMeta } from '../../cms/model/page.model';
import { PageMetaResolver } from '../../cms/page/page-meta.resolver';
import {
  PageRobotsResolver,
  PageTitleResolver,
} from '../../cms/page/page.resolvers';
import { PageType } from '../../model/cms.model';

@Injectable({
  providedIn: 'root',
})
export class CartPageMetaResolver extends PageMetaResolver
  implements PageTitleResolver, PageRobotsResolver {
  constructor(protected cartService: CartService, protected cms: CmsService) {
    super();
    this.pageType = PageType.CONTENT_PAGE;
    this.pageTemplate = 'CartPageTemplate';
  }

  resolve(): Observable<PageMeta> {
    return this.cms.getCurrentPage().pipe(
      switchMap(page =>
        combineLatest([this.resolveTitle(page), this.resolveRobots()])
      ),
      map(([title, robots]) => ({ title, robots }))
    );
  }

  resolveTitle(page: Page): Observable<string> {
    return this.cartService
      .getActive()
      .pipe(
        map(cart =>
          cart && cart.code ? `${page.title} (${cart.code})` : page.title
        )
      );
  }

  resolveRobots(): Observable<PageRobotsMeta[]> {
    return of([PageRobotsMeta.NOFOLLOW, PageRobotsMeta.NOINDEX]);
  }
}
