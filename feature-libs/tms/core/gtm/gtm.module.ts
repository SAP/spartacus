import { APP_INITIALIZER, NgModule } from '@angular/core';
import { GoogleTagManagerService } from './gtm.service';

export function gtmFactory(service: GoogleTagManagerService) {
  const result = () => {
    service.collect();
  };
  return result;
}

@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: gtmFactory,
      deps: [GoogleTagManagerService],
      multi: true,
    },
  ],
})
export class GoogleTagManagerModule {}
