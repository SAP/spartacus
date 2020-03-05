import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { TableModule } from '../table/table.module';
import { InteractiveTableComponent } from './interactive-table.component';
import { ListNavigationModule } from '../list-navigation/list-navigation.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
    ListNavigationModule,
    TableModule,
    ReactiveFormsModule,
  ],
  declarations: [InteractiveTableComponent],
  exports: [InteractiveTableComponent],
  entryComponents: [InteractiveTableComponent],
})
export class InteractiveTableModule {}
