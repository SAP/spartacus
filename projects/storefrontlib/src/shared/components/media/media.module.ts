import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { MediaComponent } from './media.component';
import { MediaConfig } from './media.config';

@NgModule({
  imports: [CommonModule],
  declarations: [MediaComponent],
  exports: [MediaComponent],
})
export class MediaModule {
  static forRoot(): ModuleWithProviders<MediaModule> {
    return {
      ngModule: MediaModule,
      providers: [
        {
          provide: MediaConfig,
          useExisting: Config,
        },
      ],
    };
  }
}
