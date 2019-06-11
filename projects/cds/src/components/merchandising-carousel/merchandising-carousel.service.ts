import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SemanticPathService } from '@spartacus/core';
import { CarouselItem } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { CdsConfig } from '../../config/config.model';

@Injectable({
  providedIn: 'root',
})
export class MerchandisingCarouselService {
  constructor(
    protected httpClient: HttpClient,
    protected config: CdsConfig,
    protected semanticPathService: SemanticPathService
  ) {}

  load(strategy: string) {
    return this.httpClient
      .get(this.getEndpoint(strategy))
      .pipe(map(response => this.convert(response)));
  }

  /**
   *
   * converts merchandising product data to the CarouselItem model.
   */
  protected convert(response: any) {
    return response.products.map(p => {
      return <CarouselItem>{
        title: p.name,
        price: p.price,
        media: {
          format: 'product',
          container: {
            product: {
              url: p.mainImage,
            },
          },
        },
        route: this.semanticPathService.transform({
          cxRoute: 'product',
          params: {
            code: p.id,
            name: p.name,
          },
        }),
      };
    });
  }

  private getEndpoint(strategy: string): string {
    let url = this.config.cds.baseUrl;
    url += '/strategy/';
    url += this.config.cds.tenantId;
    url += '/strategies/';
    url += strategy;
    url += '/products';
    return url;
  }
}
