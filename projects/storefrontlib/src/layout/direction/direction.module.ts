import { APP_INITIALIZER, NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultDirectionConfig } from './config/default-direction.config';
import { DirectionService } from './direction.service';

export function initHtmlDirAttribute(directionService: DirectionService) {
  const result = () => directionService.initialize();
  return result;
}

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
