import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalService } from '../modal.service';
import { SpinnerModule } from '../../spinner/spinner.module';
import { IconModule } from '../../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
    SpinnerModule,
    IconModule,
  ],
  declarations: [ConfirmModalComponent],
  providers: [ModalService],
  exports: [ConfirmModalComponent],
  entryComponents: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
