import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationComponent } from './pagination/pagination.component';
import { SortingComponent } from './sorting/sorting.component';
import { SearchComponent } from './search/search.component';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
  ],
  declarations: [PaginationComponent, SortingComponent, SearchComponent],
  exports: [PaginationComponent, SortingComponent, SearchComponent],
})
export class ListNavigationModule {}
