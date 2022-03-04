import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortingComponent } from './sorting.component';
import { CxNgSelectModule } from '../../ng-select/ng-select.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    CxNgSelectModule,
    I18nModule,
  ],
  declarations: [SortingComponent],
  exports: [SortingComponent],
})
export class SortingModule {}
