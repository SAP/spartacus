import { OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductService, RoutingService } from '@spartacus/core';
import { filter, map, switchMap } from 'rxjs/operators';

export abstract class BaseyotpoComponent implements OnInit, AfterViewInit {
  product$: Observable<Product>;

  constructor(protected elementRef:ElementRef, 
		protected routingService: RoutingService,
		protected productService: ProductService) { }

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
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.text = "function callYotpo() { if (yotpo && yotpo.initialized && yotpo.state=='ready') { yotpo.initWidgets(); } else { setTimeout(function() { callYotpo(); }, 1000);} } callYotpo();";
	this.elementRef.nativeElement.appendChild(s);
  }

}
