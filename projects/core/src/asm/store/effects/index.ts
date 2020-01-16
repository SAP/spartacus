import { CustomerEffects } from './customer.effect';
import { CustomerSupportAgentTokenEffects } from './csagent-token.effect';

export const effects: any[] = [
  CustomerEffects,
  CustomerSupportAgentTokenEffects,
];

export * from './customer.effect';
