import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Configurator } from '../../../core/model/configurator.model';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ConfiguratorCommonsService } from '../../../core/facade/configurator-commons.service';
import { Product, ProductService } from '@spartacus/core';
import {
  CommonConfigurator,
  ConfiguratorRouterExtractorService,
} from '@spartacus/product-configurator/common';

@Component({
  selector: 'cx-configurator-attribute-product-card',
  templateUrl: './configurator-attribute-product-card.component.html',
})
export class ConfiguratorAttributeProductCardComponent
  implements OnDestroy, OnInit {
  private subs = new Subscription();
  product$: Observable<Product>;
  quantity = new FormControl(1);

  @Input() disabledAction: boolean;
  @Input() multiSelect = false;
  @Input() product: Configurator.Value;
  @Output() handleSelect = new EventEmitter<string>();
  @Output() handleDeselect = new EventEmitter<string>();

  constructor(
    protected configuratorCommonsService: ConfiguratorCommonsService,
    protected configRouterExtractorService: ConfiguratorRouterExtractorService,
    protected productService: ProductService
  ) {}

  ngOnInit() {
    this.product$ = this.productService.get(this.product.productSystemId);

    this.subs.add(
      this.quantity.valueChanges.subscribe((value) => {
        if (!value) {
          this.onHandleDeselect();
        }
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  onHandleSelect(): void {
    this.handleSelect.emit(this.product.valueCode);
  }

  onHandleDeselect(): void {
    this.handleDeselect.emit(this.product.valueCode);
  }
}
