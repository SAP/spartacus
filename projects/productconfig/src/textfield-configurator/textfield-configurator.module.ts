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
import { TextfieldAddToCartButtonComponent } from './textfield-add-to-cart-button/textfield-add-to-cart-button.component';
import { TextfieldFormComponent } from './textfield-form/textfield-form.component';
import { TextfieldInputFieldComponent } from './textfield-input-field/textfield-input-field.component';

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
          component: TextfieldFormComponent,
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
    TextfieldFormComponent,
    TextfieldInputFieldComponent,
    TextfieldAddToCartButtonComponent,
  ],
  exports: [
    TextfieldFormComponent,
    TextfieldInputFieldComponent,
    TextfieldAddToCartButtonComponent,
  ],
  providers: [UserService],
  entryComponents: [
    TextfieldFormComponent,
    TextfieldInputFieldComponent,
    TextfieldAddToCartButtonComponent,
  ],
})
export class TextfieldConfiguratorModule {}
