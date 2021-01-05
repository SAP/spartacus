import { APP_INITIALIZER, NgModule } from '@angular/core';
import { collectors } from '../collectors/index';
import { GoogleTagManagerService } from './gtm.service';
import { TMS_COLLECTORS } from './tms.collector';

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
    ...collectors.map((collector) => ({
      provide: TMS_COLLECTORS,
      useExisting: collector,
      multi: true,
    })),
  ],
})
export class GoogleTagManagerModule {}
