import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitCreateComponent } from './unit-create.component';
import { UnitFormModule } from '../form/unit-form.module';
import { IconModule, SplitViewModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UnitFormModule,
    I18nModule,
    UrlModule,
    SplitViewModule,
    RouterModule,
    IconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [UnitCreateComponent],
})
export class UnitCreateModule {}
