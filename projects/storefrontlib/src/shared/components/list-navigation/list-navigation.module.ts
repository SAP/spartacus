import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './pagination/pagination.component';
import { SortingComponent } from './sorting/sorting.component';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule],
  declarations: [PaginationComponent, SortingComponent],
  exports: [PaginationComponent, SortingComponent],
})
export class ListNavigationModule {}
