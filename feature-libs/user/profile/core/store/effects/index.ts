import { ForgotPasswordEffects } from './forgot-password.effect';
import { ResetPasswordEffects } from './reset-password.effect';
import { TitlesEffects } from './titles.effect';
import { UpdateEmailEffects } from './update-email.effect';
import { UpdatePasswordEffects } from './update-password.effect';
import { UpdateProfileEffects } from './update-profile.effect';
import { UserRegisterEffects } from './user-register.effect';

export const effects: any[] = [
  ForgotPasswordEffects,
  ResetPasswordEffects,
  TitlesEffects,
  UpdateEmailEffects,
  UpdatePasswordEffects,
  UserRegisterEffects,
  UpdateProfileEffects,
];

export * from './forgot-password.effect';
export * from './reset-password.effect';
export * from './titles.effect';
export * from './update-email.effect';
export * from './update-password.effect';
export * from './update-profile.effect';
export * from './user-register.effect';
