import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { PaginationModule } from './pagination/index';
import { SortingModule } from './sorting/sorting.module';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    PaginationModule,
    SortingModule,
  ],
})
export class ListNavigationModule {}
