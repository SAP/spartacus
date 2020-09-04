import { ConfiguratorCartEffects } from './configurator-cart.effect';
import { ConfiguratorPlaceOrderHookEffects } from './configurator-place-order-hook.effect';
import { ConfiguratorEffects } from './configurator.effect';

export const configuratorEffects: any[] = [
  ConfiguratorEffects,
  ConfiguratorCartEffects,
  ConfiguratorPlaceOrderHookEffects,
];

export { ConfiguratorPlaceOrderHookEffects as ɵConfiguratorPlaceOrderHookEffects };
export { ConfiguratorEffects as ɵConfiguratorEffects };
export { ConfiguratorCartEffects as ɵConfiguratorCartEffects };
