import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Config } from '@spartacus/core';
import { MediaComponent } from './media.component';
import { MediaConfig } from './media.config';

@NgModule({
  imports: [CommonModule],
  declarations: [MediaComponent],
  exports: [MediaComponent],
  providers: [{ provide: MediaConfig, useExisting: Config }],
})
export class MediaModule {}
