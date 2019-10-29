import { APP_INITIALIZER, NgModule } from '@angular/core';
<<<<<<< HEAD
import { ProfileTagInjector } from './profile-tag.injector';

export function profileTagFactory(service: ProfileTagInjector): any {
=======
import { ScriptService } from './profile-tag.injector';

export function profileTagFactory(service: ScriptService): any {
>>>>>>> 6a0469c59a3bb5d43f3c6c63b5f9b7a0d2bb5a93
  const result = () => service;
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: profileTagFactory,
<<<<<<< HEAD
      deps: [ProfileTagInjector],
=======
      deps: [ScriptService],
>>>>>>> 6a0469c59a3bb5d43f3c6c63b5f9b7a0d2bb5a93
      multi: true,
    },
  ],
})
<<<<<<< HEAD
export class ProfileTagModule { }
=======
export class ProfileTagModule {}
>>>>>>> 6a0469c59a3bb5d43f3c6c63b5f9b7a0d2bb5a93
