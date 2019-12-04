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
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button/config-textfield-add-to-cart-button.component';
import { ConfigTextfieldFormComponent } from './config-textfield-form/config-textfield-form.component';
import { ConfigTextfieldInputFieldComponent } from './config-textfield-input-field/config-textfield-input-field.component';

@NgModule({
  imports: [
    CommonModule,
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

  declarations: [
    ConfigTextfieldFormComponent,
    ConfigTextfieldInputFieldComponent,
    ConfigTextfieldAddToCartButtonComponent,
  ],
  exports: [
    ConfigTextfieldFormComponent,
    ConfigTextfieldInputFieldComponent,
    ConfigTextfieldAddToCartButtonComponent,
  ],
  providers: [UserService],
  entryComponents: [
    ConfigTextfieldFormComponent,
    ConfigTextfieldInputFieldComponent,
    ConfigTextfieldAddToCartButtonComponent,
  ],
})
export class TextfieldConfiguratorModule {}
