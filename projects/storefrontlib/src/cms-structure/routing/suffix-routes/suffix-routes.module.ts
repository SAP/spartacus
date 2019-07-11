import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { SuffixRoutesConfig } from './suffix-routes-config';
import { SuffixRoutesService } from './suffix-routes.service';

export function initSuffixRoutesService(
  service: SuffixRoutesService
): () => void {
  const result = () => service.init();
  return result;
}

@NgModule({
  providers: [
    { provide: SuffixRoutesConfig, useExisting: Config },
    {
      provide: APP_INITIALIZER,
      useFactory: initSuffixRoutesService,
      multi: true,
      deps: [SuffixRoutesService],
    },
  ],
})
export class SuffixRoutesModule {}
