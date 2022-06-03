import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FilteringComponent } from './filtering.component';
import { NgSelectA11yModule } from '../../ng-select-a11y/ng-select-a11y.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    NgSelectA11yModule,
    I18nModule,
  ],
  declarations: [FilteringComponent],
  exports: [FilteringComponent],
})
export class FilteringModule {}
