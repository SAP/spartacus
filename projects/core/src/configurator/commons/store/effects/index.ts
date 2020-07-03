import { ConfiguratorPlaceOrderHookEffects } from './configurator-place-order-hook.effect';
import { ConfiguratorEffects } from './configurator.effect';

export const configuratorEffects: any[] = [
  ConfiguratorEffects,
  ConfiguratorPlaceOrderHookEffects,
];

export * from './configurator-place-order-hook.effect';
export * from './configurator.effect';
