import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FeatureConfigService, provideDefaultConfig } from '@spartacus/core';
import { defaultDirectionConfig } from './config/default-direction.config';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(
  directionService: DirectionService,
  featureConfigService: FeatureConfigService
): () => void {
  const result = () => {
    if (featureConfigService.isLevel('2.1')) {
      return directionService.initialize();
    }
  };
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
      deps: [DirectionService, FeatureConfigService],
    },
    provideDefaultConfig(defaultDirectionConfig),
  ],
})
export class DirectionModule {}
