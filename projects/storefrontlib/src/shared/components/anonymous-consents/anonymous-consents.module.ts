import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { ConsentManagementModule } from '../../../cms-components/myaccount/consent-management/consent-management.module';
import { AnonymousConsentsDialogComponent } from './dialog/anonymous-consents-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, ConsentManagementModule],
  declarations: [AnonymousConsentsDialogComponent],
  entryComponents: [AnonymousConsentsDialogComponent],
  exports: [AnonymousConsentsDialogComponent],
})
export class AnonymousConsentsModule {}
