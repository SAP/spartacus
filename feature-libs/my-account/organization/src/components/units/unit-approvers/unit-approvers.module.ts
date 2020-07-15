import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { UnitApproversComponent } from './unit-approvers.component';
import { FakeTabsModule, InteractiveTableModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    NgSelectModule,
    FormsModule,
    FakeTabsModule,
  ],
  declarations: [UnitApproversComponent],
  exports: [UnitApproversComponent],
  providers: [],
  entryComponents: [UnitApproversComponent],
})
export class UnitApproversModule {}
