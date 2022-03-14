import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortingComponent } from './sorting.component';
import { CxNgSelectA11yModule } from '../../ng-select-a11y/ng-select-a11y.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CxNgSelectA11yModule,
    I18nModule,
  ],
  declarations: [SortingComponent],
  exports: [SortingComponent],
})
export class SortingModule {}
