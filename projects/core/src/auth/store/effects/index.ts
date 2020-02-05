import { OccUserIdEffect } from '../../occ-user-id/store/effects/occ-user-id.effect';
import { ClientTokenEffect } from './client-token.effect';
import { UserTokenEffects } from './user-token.effect';

export const effects: any[] = [
  UserTokenEffects,
  ClientTokenEffect,
  OccUserIdEffect,
];

export * from '../../occ-user-id/store/effects/occ-user-id.effect';
export * from './client-token.effect';
export * from './user-token.effect';
