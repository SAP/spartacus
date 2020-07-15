import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  Config,
  ConfigModule,
  I18nModule,
  ProductModule,
  UrlModule,
  UserService,
} from '@spartacus/core';
import { IconModule } from '../../../cms-components/misc/icon/icon.module';
import { HamburgerMenuModule } from '../../../layout/header/hamburger-menu/hamburger-menu.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ConfigAddToCartButtonComponent } from '../commons/config-add-to-cart-button/config-add-to-cart-button.component';
import { ConfigAttributeFooterComponent } from '../commons/config-attribute-footer/config-attribute-footer.component';
import { ConfigAttributeHeaderComponent } from '../commons/config-attribute-header/config-attribute-header.component';
import { ConfigAttributeCheckBoxListComponent } from '../commons/config-attribute-types/config-attribute-checkbox-list/config-attribute-checkbox-list.component';
import { ConfigAttributeCheckBoxComponent } from '../commons/config-attribute-types/config-attribute-checkbox/config-attribute-checkbox.component';
import { ConfigAttributeDropDownComponent } from '../commons/config-attribute-types/config-attribute-drop-down/config-attribute-drop-down.component';
import { ConfigAttributeInputFieldComponent } from '../commons/config-attribute-types/config-attribute-input-field/config-attribute-input-field.component';
import { ConfigAttributeMultiSelectionImageComponent } from '../commons/config-attribute-types/config-attribute-multi-selection-image/config-attribute-multi-selection-image.component';
import { ConfigAttributeNumericInputFieldComponent } from '../commons/config-attribute-types/config-attribute-numeric-input-field/config-attribute-numeric-input-field.component';
import { ConfigAttributeRadioButtonComponent } from '../commons/config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigAttributeReadOnlyComponent } from '../commons/config-attribute-types/config-attribute-read-only/config-attribute-read-only.component';
import { ConfigAttributeSingleSelectionImageComponent } from '../commons/config-attribute-types/config-attribute-single-selection-image/config-attribute-single-selection-image.component';
import { ConfigFormComponent } from '../commons/config-form/config-form.component';
import { ConfigGroupMenuComponent } from '../commons/config-group-menu/config-group-menu.component';
import { DefaultMessageConfig } from '../commons/config/default-message-config';
import { MessageConfig } from '../commons/config/message-config';
import { GenericConfiguratorModule } from '../generic/generic-configurator.module';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    ProductModule,
    ConfigModule.withConfig(DefaultMessageConfig),
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    UrlModule,
    HamburgerMenuModule,
    I18nModule,
    IconModule,
    SpinnerModule,
  ],

  declarations: [
    ConfigFormComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeSingleSelectionImageComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
    ConfigGroupMenuComponent,
    ConfigAddToCartButtonComponent,
  ],
  exports: [
    ConfigFormComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeSingleSelectionImageComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
    ConfigGroupMenuComponent,
    ConfigAddToCartButtonComponent,
  ],
  providers: [UserService, { provide: MessageConfig, useExisting: Config }],
  entryComponents: [
    ConfigFormComponent,
    ConfigAttributeRadioButtonComponent,
    ConfigAttributeDropDownComponent,
    ConfigAttributeCheckBoxComponent,
    ConfigAttributeCheckBoxListComponent,
    ConfigAttributeMultiSelectionImageComponent,
    ConfigAttributeSingleSelectionImageComponent,
    ConfigAttributeInputFieldComponent,
    ConfigAttributeNumericInputFieldComponent,
    ConfigAttributeReadOnlyComponent,
    ConfigAttributeHeaderComponent,
    ConfigAttributeFooterComponent,
    ConfigGroupMenuComponent,
    ConfigAddToCartButtonComponent,
  ],
})
export class VariantConfiguratorModule {}
