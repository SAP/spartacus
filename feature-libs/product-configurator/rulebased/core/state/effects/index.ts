import { ConfiguratorBasicEffects } from './configurator-basic.effect';
import { ConfiguratorCartEffects } from './configurator-cart.effect';
import { ConfiguratorPlaceOrderHookEffects } from './configurator-place-order-hook.effect';

export const ConfiguratorEffects: any[] = [
  ConfiguratorBasicEffects,
  ConfiguratorCartEffects,
  ConfiguratorPlaceOrderHookEffects,
];
