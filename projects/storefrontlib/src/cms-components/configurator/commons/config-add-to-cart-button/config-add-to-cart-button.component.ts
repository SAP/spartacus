import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  Configurator,
  ConfiguratorCommonsService,
  RoutingService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ConfigRouterExtractorService } from '../service/config-router-extractor.service';

@Component({
  selector: 'cx-config-add-to-cart-button',
  templateUrl: './config-add-to-cart-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigAddToCartButtonComponent implements OnInit {
  configuration$: Observable<Configurator.Configuration>;

  constructor(
    private routingService: RoutingService,
    private configuratorCommonsService: ConfiguratorCommonsService,
    private configRouterExtractorService: ConfigRouterExtractorService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this.configRouterExtractorService
      .extractConfigurationOwner(this.routingService)
      .pipe(
        switchMap(owner =>
          this.configuratorCommonsService.getConfiguration(owner.key)
        )
      );
  }

  onAddToCart(productCode: string, configId: string) {
    this.configuratorCommonsService.addToCart(productCode, configId);
  }
}
