import { Injectable } from '@angular/core';
import { EventService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDetailsPageEvent } from '../../../events/product/product-page.events';
import { TmsDataCollector } from '../../gtm/tms.collector';

@Injectable({ providedIn: 'root' })
export class ProductPageViewCollector implements TmsDataCollector {
  constructor(protected eventService: EventService) {}

  collect(): Observable<any> {
    return this.eventService.get(ProductDetailsPageEvent).pipe(
      map((event) => ({
        event: 'ProductDetailPageViewEvent',
        product: { ...event },
      }))
    );
  }
}
