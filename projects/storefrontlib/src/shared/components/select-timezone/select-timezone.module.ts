import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectTimezoneComponent } from './select-timezone.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgSelectModule],
  declarations: [SelectTimezoneComponent],
  exports: [SelectTimezoneComponent],
})
export class SelectTimezoneModule {}
