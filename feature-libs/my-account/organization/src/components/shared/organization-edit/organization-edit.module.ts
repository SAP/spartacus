import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { OrganizationCardModule } from '../organization-card/organization-card.module';
import { OrganizationEditComponent } from './organization-edit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    I18nModule,
    RouterModule,
    OrganizationCardModule,
  ],
  declarations: [OrganizationEditComponent],
  exports: [OrganizationEditComponent],
})
export class OrganizationEditModule {}
