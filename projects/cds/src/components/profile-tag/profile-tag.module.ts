import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ScriptService } from './profile-tag.injector';

export function profileTagFactory(service: ScriptService): any {
  const result = () => service;
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: profileTagFactory,
      deps: [ScriptService],
      multi: true,
    },
  ],
})
export class ProfileTagModule {}
