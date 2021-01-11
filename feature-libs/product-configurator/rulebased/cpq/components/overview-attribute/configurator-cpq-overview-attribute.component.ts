import { Component, Input, OnInit } from '@angular/core';
import { Product, ProductService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { Configurator } from '../../../core/model/index';

@Component({
  selector: 'cx-configurator-cpq-overview-attribute',
  templateUrl: './configurator-cpq-overview-attribute.component.html',
})
export class ConfiguratorCPQOverviewAttributeComponent implements OnInit {
  product$: Observable<Product>;

  @Input() attributeOverview: Configurator.AttributeOverview;

  constructor(protected productService: ProductService) {}

  ngOnInit() {
    this.product$ = this.productService.get(
      this.attributeOverview?.productCode
    );
  }
}
