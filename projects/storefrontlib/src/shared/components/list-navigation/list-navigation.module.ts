import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent, PaginationModule } from './pagination/index';
import { SortingComponent } from './sorting/sorting.component';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, PaginationModule],
  declarations: [SortingComponent],
  exports: [SortingComponent, PaginationComponent],
})
export class ListNavigationModule {}
