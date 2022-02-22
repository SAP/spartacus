import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortingComponent } from './sorting.component';
import { CxNgSelectModule } from '../../ng-select/ng-select.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, CxNgSelectModule],
  declarations: [SortingComponent],
  exports: [SortingComponent],
})
export class SortingModule {}
