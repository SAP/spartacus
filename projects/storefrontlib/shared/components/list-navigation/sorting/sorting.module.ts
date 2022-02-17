import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SortingComponent } from './sorting.component';
import { BindAttributesModule } from '../../bind-attributes/bind-attributes.directive.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, NgSelectModule, FormsModule, BindAttributesModule],
  declarations: [SortingComponent],
  exports: [SortingComponent],
})
export class SortingModule {}
