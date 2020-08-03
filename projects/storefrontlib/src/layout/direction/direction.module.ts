import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultDirectionConfig } from './config/default-direction.config';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(directionService: DirectionService) {
  const result = () => directionService.initialize();
  return result;
}

/**
 * Provides a configuration and APP_INITIALIZER to add the correct (language drive) html direction.
 */
@NgModule({
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initHtmlDirAttribute,
      deps: [DirectionService],
    },
    provideDefaultConfig(defaultDirectionConfig),
  ],
})
export class DirectionModule {}
