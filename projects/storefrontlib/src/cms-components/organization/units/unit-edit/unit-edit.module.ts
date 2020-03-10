import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
} from '@spartacus/core';
import { UnitEditComponent } from './unit-edit.component';
import { UnitFormModule } from '../unit-form/unit-form.module';
import { RouterModule } from '@angular/router';
import { CmsPageGuard } from '../../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../../cms-structure/page/page-layout/page-layout.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orgUnitEdit' },
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        UnitEditComponent: {
          component: UnitEditComponent,
          guards: [AuthGuard],
        },
      },
    }),
    UnitFormModule,
    I18nModule,
  ],
  declarations: [UnitEditComponent],
  exports: [UnitEditComponent],
  entryComponents: [UnitEditComponent],
})
export class UnitEditModule {}
