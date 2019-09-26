import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/index';
import { AnonymousConsentsDialogComponent } from './dialog/anonymous-consents-dialog.component';
import { AnonymousConsentsComponent } from './dialog/anonymous-consents.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule],
  declarations: [AnonymousConsentsComponent, AnonymousConsentsDialogComponent],
  entryComponents: [
    AnonymousConsentsComponent,
    AnonymousConsentsDialogComponent,
  ],
  exports: [AnonymousConsentsComponent, AnonymousConsentsDialogComponent],
})
export class AnonymousConsentsModule {}
