import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  KeyboardFocusModule,
  PaginationModule,
  SplitViewModule,
  TableModule,
} from '@spartacus/storefront';
import { MessageModule } from '../message/message.module';
import { ListComponent } from './list.component';
import { PopoverModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SplitViewModule,
    TableModule,
    IconModule,
    UrlModule,
    I18nModule,
    PaginationModule,
    NgSelectModule,
    FormsModule,
    MessageModule,
    KeyboardFocusModule,
    PopoverModule,
  ],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
