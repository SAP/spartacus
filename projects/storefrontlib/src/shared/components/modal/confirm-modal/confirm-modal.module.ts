import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalService } from '../modal.service';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [ConfirmModalComponent],
  providers: [ModalService],
  exports: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
