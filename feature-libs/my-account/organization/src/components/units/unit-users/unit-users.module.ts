import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { UnitUsersComponent } from './unit-users.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { FakeTabsModule, InteractiveTableModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    InteractiveTableModule,
    NgSelectModule,
    FormsModule,
    FakeTabsModule,
  ],
  declarations: [UnitUsersComponent],
  exports: [UnitUsersComponent],
  providers: [],
  entryComponents: [UnitUsersComponent],
})
export class UnitUsersModule {}
