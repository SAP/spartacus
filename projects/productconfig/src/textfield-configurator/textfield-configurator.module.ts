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
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { ConfigTextfieldAddToCartButtonComponent } from './components/config-textfield-add-to-cart-button/config-textfield-add-to-cart-button.component';
import { ConfigTextfieldFormComponent } from './components/config-textfield-form/config-textfield-form.component';
import { ConfigTextfieldInputFieldComponent } from './components/config-textfield-input-field/config-textfield-input-field.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'configureTEXTFIELD/:ownerType/entityKey/:entityKey',
        component: PageLayoutComponent,
        data: { pageLabel: '/configureTEXTFIELD' },
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
