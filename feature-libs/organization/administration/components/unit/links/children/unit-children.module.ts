import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { ExplainDisableInfoModule } from '../../../shared/detail/explain-disable-info/explain-disable-info.module';
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
    ExplainDisableInfoModule,
  ],
  declarations: [UnitChildrenComponent],
})
export class UnitChildrenModule {}
