import { ClientTokenEffect } from './client-token.effect';
import { UserTokenEffects } from './user-token.effect';

export const effects: any[] = [UserTokenEffects, ClientTokenEffect];

export * from './client-token.effect';
export * from './user-token.effect';
