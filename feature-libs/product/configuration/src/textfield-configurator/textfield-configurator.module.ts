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
import { ConfiguratorTextfieldService } from './facade/configurator-textfield.service';
import { ConfiguratorTextfieldOccModule } from './occ/configurator-textfield-occ.module';
import { ConfiguratorTextfieldStoreModule } from './state/configurator-textfield-store.module';
/**
 * Exposes the textfield configurator, a small configurator that only provides 3 attributes at product level without any dependencies between them,
 * and in the first place serves as a template for other configurator implementations.
 */
@NgModule({
  imports: [
    CommonModule,
    ConfiguratorTextfieldStoreModule,
    ConfiguratorTextfieldOccModule,
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
  providers: [UserService, ConfiguratorTextfieldService],
  entryComponents: [
    ConfigTextfieldFormComponent,
    ConfigTextfieldInputFieldComponent,
    ConfigTextfieldAddToCartButtonComponent,
  ],
})
export class TextfieldConfiguratorModule {}
