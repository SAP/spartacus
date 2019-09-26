import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CdsConfig, SemanticPathService } from '@spartacus/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCarouselItem } from '../product-carousel.model';

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

  protected convert(response: any) {
    console.log('merchan service', response);
    return response.products.map(p => {
      return of(<ProductCarouselItem>{
        name: p.name,
        price: p.price,
        code: p.id,
        images: {
          PRIMARY: {
            product: {
              format: 'product',
              imageType: 'PRIMARY',
              url: p.mainImage,
            },
          },
        },
      });
    });
  }

  private getEndpoint(strategy: string): string {
    return `${this.config.cds.baseUrl}/strategy/${this.config.cds.tenantId}/strategies/${strategy}/products`;
  }
}
