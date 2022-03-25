import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MediaComponent } from './media.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MediaComponent],
  exports: [MediaComponent],
})
export class MediaModule {
  static forRoot(): ModuleWithProviders<MediaModule> {
    return {
      ngModule: MediaModule,
    };
  }
}
