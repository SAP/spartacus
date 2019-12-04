import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ConfiguratorTextfield,
  ConfiguratorTextfieldService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'cx-config-textfield-add-to-cart-button',
  templateUrl: './config-textfield-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigTextfieldAddToCartButtonComponent implements OnInit {
  constructor(
    private configuratorTextfieldService: ConfiguratorTextfieldService,
    private routingService: RoutingService
  ) {}

  @Input() configuration$: Observable<ConfiguratorTextfield.Configuration>;
  @Input() productCode: string;

  ngOnInit(): void {}

  onAddToCart() {
    this.routingService
      .getRouterState()
      .pipe(take(1))
      .subscribe(routerState =>
        this.configuratorTextfieldService.addToCart(
          routerState.state.params.rootProduct
        )
      );
    this.routingService.go({ cxRoute: 'cart' });
  }
}
