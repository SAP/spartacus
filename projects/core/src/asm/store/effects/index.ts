import { CustomerSupportAgentTokenEffects } from './csagent-token.effect';
import { CustomerEffects } from './customer.effect';

export const effects: any[] = [
  CustomerEffects,
  CustomerSupportAgentTokenEffects,
];

export * from './customer.effect';
