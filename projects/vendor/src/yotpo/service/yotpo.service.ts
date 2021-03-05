import { ElementRef, Injectable } from '@angular/core';
import {
  Product,
  ProductService,
  RoutingService,
  WindowRef,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';

@Injectable({
  providedIn: 'root',
})
export class YotpoService {
  constructor(
    protected config: YotpoConfig,
    protected windowRef: WindowRef,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    const widgetscript = this.windowRef.document.createElement('script');
    widgetscript.type = 'text/javascript';
    widgetscript.async = true;
    widgetscript.src = `https://staticw2.yotpo.com/${this.config.vendor.yotpo.appToken}/widget.js`;
    this.windowRef.document
      .getElementsByTagName('head')[0]
      .appendChild(widgetscript);
  }

  getProduct(): Observable<Product> {
    return this.routingService.getRouterState().pipe(
      map((state) => state.state.params['productCode']),
      filter((productCode) => !!productCode),
      switchMap((productCode: string) => this.productService.get(productCode))
    );
  }

  addYotpoInitWidgetsScript(elementRef: ElementRef) {
    const s = this.windowRef.document.createElement('script');
    s.type = 'text/javascript';
    s.text = `function callYotpo() { if (typeof yotpo !== 'undefined' && yotpo.initialized && yotpo.state=='ready') { yotpo.initWidgets(); } else { setTimeout(function() { callYotpo(); }, 1000);} } callYotpo();`;
    elementRef.nativeElement.appendChild(s);
  }
}
