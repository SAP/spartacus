import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { FakeTabsModule } from '../../../cms-components/organization/fake-tabs/fake-tabs.module';
import { SplitViewModule } from '../../../_organization/shared/split-view/split-view.module';
import { CostCenterFormModule } from '../cost-center-form/cost-center-form.module';
import { CostCenterEditComponent } from './cost-center-edit.component';

@NgModule({
  imports: [
    CommonModule,
    CostCenterFormModule,
    I18nModule,
    SplitViewModule,
    IconModule,
    RouterModule,
    FakeTabsModule,
  ],
  declarations: [CostCenterEditComponent],
  exports: [CostCenterEditComponent],
  entryComponents: [CostCenterEditComponent],
})
export class CostCenterEditModule {}
