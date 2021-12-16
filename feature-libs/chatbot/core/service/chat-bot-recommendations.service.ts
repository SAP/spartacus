import { Injectable } from '@angular/core';
import { ProductSearchService, ProductService } from '@spartacus/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChatBotRecommendationsService {
  constructor(
    protected productService: ProductService,
    protected productSearchService: ProductSearchService
  ) {}

  recommendations$ = this.productSearchService.getResults().pipe(
    map((searchResults) =>
      searchResults.products ? searchResults.products : []
    ),
    map((data) => data.map((product) => this.productService.get(product.code)))
  );
}
