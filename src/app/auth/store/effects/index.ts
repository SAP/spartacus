import { UserTokenEffects } from './user-token.effect';
import { UserDetailsEffects } from './user-details.effect';

export const effects: any[] = [UserDetailsEffects, UserTokenEffects];

export * from './user-token.effect';
export * from './user-details.effect';
