import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationCardModule } from '../organization-card/organization-card.module';
import { OrganizationFormComponent } from './organization-form.component';
import { MessageService } from '../organization-message/services/message.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    OrganizationCardModule,
  ],
  declarations: [OrganizationFormComponent],
  providers: [MessageService],
  exports: [OrganizationFormComponent],
})
export class OrganizationFormModule {}
