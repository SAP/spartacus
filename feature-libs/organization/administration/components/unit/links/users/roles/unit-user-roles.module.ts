import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { CardModule } from '../../../../shared/card/card.module';
import { UnitUserRolesFormComponent } from './unit-user-roles.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    FormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ReactiveFormsModule,
  ],
  declarations: [UnitUserRolesFormComponent],
})
export class UnitUserRolesModule {}
