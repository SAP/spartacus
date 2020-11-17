import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ItemActiveModule } from '../item-active.module';
import { CardModule } from '../card/card.module';
import { MessageModule } from '../organization-message/message.module';
import { MessageService } from '../organization-message/services/message.service';
import { OrganizationFormComponent } from './organization-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    CardModule,
    MessageModule,
    ItemActiveModule,
  ],
  declarations: [OrganizationFormComponent],
  providers: [MessageService],
  exports: [OrganizationFormComponent],
})
export class OrganizationFormModule {}
