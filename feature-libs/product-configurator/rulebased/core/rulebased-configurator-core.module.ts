import { NgModule } from '@angular/core';
import { MODULE_INITIALIZER } from '@spartacus/core';
import { RulebasedConfiguratorConnector } from './connectors/rulebased-configurator.connector';
import { ConfiguratorPlaceOrderService } from './facade/configurator-place-order.service';
import { RulebasedConfiguratorStateModule } from './state/rulebased-configurator-state.module';

function initEventListener(service: ConfiguratorPlaceOrderService): () => void {
  const result = () => service.init();
  return result;
}
/**
 * Exposes the rulebased configurator core entities.
 * Explicit providing of connector because otherwise lazy loading does not work
 */
@NgModule({
  imports: [RulebasedConfiguratorStateModule],
  providers: [
    RulebasedConfiguratorConnector,
    {
      provide: MODULE_INITIALIZER,
      useFactory: initEventListener,
      deps: [ConfiguratorPlaceOrderService],
      multi: true,
    },
  ],
})
export class RulebasedConfiguratorCoreModule {}
