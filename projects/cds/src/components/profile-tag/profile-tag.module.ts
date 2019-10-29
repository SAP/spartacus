import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ProfileTagInjector } from './profile-tag.injector';

export function profileTagFactory(service: ProfileTagInjector): any {
  const result = () => service;
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: profileTagFactory,
      deps: [ProfileTagInjector],
      multi: true,
    },
  ],
})
export class ProfileTagModule { }
