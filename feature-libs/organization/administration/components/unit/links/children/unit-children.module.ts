import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ExplainDisableMessagesModule } from '../../../shared/detail/explain-disable-messages/explain-disable-messages.module';
import { ListModule } from '../../../shared/list/list.module';
import { SubListModule } from '../../../shared/sub-list/sub-list.module';
import { UnitChildrenComponent } from './unit-children.component';

@NgModule({
  imports: [
    ListModule,
    I18nModule,
    RouterModule,
    SubListModule,
    CommonModule,
    ExplainDisableMessagesModule,
  ],
  declarations: [UnitChildrenComponent],
})
export class UnitChildrenModule {}
