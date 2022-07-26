import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagingComponent } from './messaging.component';
import { I18nModule } from '@spartacus/core';
import { IconModule } from 'projects/storefrontlib/cms-components/misc/icon/icon.module';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from '../avatar';
import { FileUploadModule } from '../../form';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    FormsModule,
    AvatarModule,
    FileUploadModule,
  ],
  declarations: [MessagingComponent],
  exports: [MessagingComponent],
})
export class MessagingModule {}
