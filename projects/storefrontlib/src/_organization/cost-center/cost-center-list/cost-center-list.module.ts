import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc';
import { OutletRefModule } from '../../../cms-structure/outlet/outlet-ref/outlet-ref.module';
import { SplitViewModule } from '../../shared/split-view/split-view.module';
import { TableModule } from '../../shared/table/table.module';
import { CostCenterListComponent } from './cost-center-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,

    // shared
    TableModule,
    SplitViewModule,
    IconModule,
    UrlModule,
    I18nModule,
    OutletRefModule,
  ],
  declarations: [CostCenterListComponent],
})
export class CostCenterListModule {}
