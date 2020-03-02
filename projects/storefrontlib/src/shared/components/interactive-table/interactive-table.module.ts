import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ListNavigationModule } from '../list-navigation/list-navigation.module';
import { TableModule } from '../table/table.module';
import { InteractiveTableComponent } from './interactive-table.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ListNavigationModule,
    UrlModule,
    I18nModule,
    TableModule,
    ReactiveFormsModule,
  ],
  declarations: [InteractiveTableComponent],
  exports: [InteractiveTableComponent],
  entryComponents: [InteractiveTableComponent],
})
export class InteractiveTableModule {}
