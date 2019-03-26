import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService, RoutingService, WindowRef } from '@spartacus/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { YotpoConfig } from '../yotpoconfig/yotpo-config';

export abstract class BaseyotpoComponent implements OnInit, AfterViewInit {
  product$: Observable<Product>;

  constructor(protected config: YotpoConfig, protected windowRef: WindowRef,
    protected elementRef: ElementRef,
    protected routingService: RoutingService,
    protected productService: ProductService
  ) {
    const widgetscript = this.windowRef.document.createElement('script');
    widgetscript.type = 'text/javascript';
    widgetscript.async = true;
    widgetscript.src = `https://staticw2.yotpo.com/${this.config.vendor.yotpo.appToken}/widget.js`;
    this.windowRef.document.getElementsByTagName('head')[0].appendChild(widgetscript);
}

  ngOnInit() {
    this.product$ = this.getProduct();
  }

  getProduct(): Observable<Product> {
    return this.routingService.getRouterState().pipe(
      map(state => state.state.params['productCode']),
      filter(productCode => !!productCode),
      switchMap((productCode: string) => this.productService.get(productCode))
    );
  }

  ngAfterViewInit() {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.text =
      "function callYotpo() { if (typeof yotpo !== 'undefined' && yotpo.initialized && yotpo.state=='ready') { yotpo.initWidgets(); } else { setTimeout(function() { callYotpo(); }, 1000);} } callYotpo();";
    this.elementRef.nativeElement.appendChild(s);
  }
}
