import { Injectable } from '@angular/core';
import { SearchPageMetaResolver } from './search-page-meta.resolver';
import { Observable, of } from 'rxjs';
import { TranslationService } from '../../i18n/translation.service';
import { RoutingService } from '../../routing';
import { ProductSearchService } from '../facade';
@Injectable({
  providedIn: 'root',
})
export class FindProductsPageMetaResolver extends SearchPageMetaResolver {
  constructor(
    protected routingService: RoutingService,
    protected productSearchService: ProductSearchService,
    protected translation: TranslationService
  ) {
    super(routingService, productSearchService, translation);
  }

  resolveTitle(total: number, query: string): Observable<string> {
    if (!query.match(':relevance:category:1')) {
      return super.resolveTitle(total, query);
    } else {
      return of(total + ' available products for this Coupon');
    }
  }
}
