import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { PaginationComponent, PaginationModule } from './pagination/index';
import { SortingComponent } from './sorting/sorting.component';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    PaginationModule,
  ],
  declarations: [SortingComponent],
  exports: [SortingComponent, PaginationComponent],
})
export class ListNavigationModule {}
