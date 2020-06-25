import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { defaultImageZoomLayoutConfig } from './default-image-zoom-layout.config';
import { ImageZoomDialogComponent } from './dialog/image-zoom-dialog.component';
import { ImageZoomTriggerComponent } from './trigger/image-zoom-trigger';

@NgModule({
  imports: [IconModule, KeyboardFocusModule],
  providers: [provideConfig(defaultImageZoomLayoutConfig)],
  exports: [ImageZoomDialogComponent, ImageZoomTriggerComponent],
  declarations: [ImageZoomDialogComponent, ImageZoomTriggerComponent],
})
export class ImageZoomModule {}
