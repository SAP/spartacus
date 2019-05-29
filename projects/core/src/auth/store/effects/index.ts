import { ClientTokenEffect } from './client-token.effect';
import { OpenIdTokenEffect } from './open-id-token.effect';
import { UserTokenEffects } from './user-token.effect';

export const effects: any[] = [
  UserTokenEffects,
  ClientTokenEffect,
  OpenIdTokenEffect,
];

export * from './client-token.effect';
export * from './open-id-token.effect';
export * from './user-token.effect';
