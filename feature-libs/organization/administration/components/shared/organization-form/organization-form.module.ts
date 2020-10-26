import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationCardModule } from '../organization-card/organization-card.module';
import { OrganizationFormComponent } from './organization-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    OrganizationCardModule,
  ],
  declarations: [OrganizationFormComponent],
  exports: [OrganizationFormComponent],
})
export class OrganizationFormModule {}
