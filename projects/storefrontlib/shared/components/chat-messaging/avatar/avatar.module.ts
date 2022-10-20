import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
})
export class AvatarModule {}
