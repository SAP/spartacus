import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { CmsPageGuard } from '../../../cms-structure/guards/cms-page.guard';
import { PageLayoutComponent } from '../../../cms-structure/page/page-layout/page-layout.component';
import { ConfigureProductModule } from '../commons/configure-product/configure-product.module';
import { ConfigTextfieldFormComponent } from './config-textfield-form/config-textfield-form.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigureProductModule,
    RouterModule.forChild([
      {
        path: 'configureTEXTFIELD/:rootProduct',
        data: { pageLabel: '/configureTEXTFIELD' },
        component: PageLayoutComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        TextfieldConfigurationForm: {
          component: ConfigTextfieldFormComponent,
          guards: [],
        },
      },
      layoutSlots: {
        TextfieldConfigurationTemplate: {
          slots: ['TextfieldConfigContent'],
        },
      },
    }),

    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    I18nModule,
  ],

  declarations: [ConfigTextfieldFormComponent],
  exports: [ConfigTextfieldFormComponent],
  providers: [UserService],
  entryComponents: [ConfigTextfieldFormComponent],
})
export class TextfieldConfiguratorModule {}
