import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ItemActiveModule } from '../item-active.module';
import { CardModule } from '../card/card.module';
import { MessageModule } from '../message/message.module';
import { MessageService } from '../message/services/message.service';
import { FormComponent } from './form.component';
import { KeyboardFocusModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    CardModule,
    MessageModule,
    ItemActiveModule,
    KeyboardFocusModule,
  ],
  declarations: [FormComponent],
  providers: [MessageService],
  exports: [FormComponent],
})
export class FormModule {}
