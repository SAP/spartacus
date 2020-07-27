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
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { HamburgerMenuModule } from '../../../layout/header/hamburger-menu/hamburger-menu.module';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { ConfigAddToCartButtonComponent } from '../commons/config-add-to-cart-button/config-add-to-cart-button.component';
import { ConfigGroupMenuComponent } from '../commons/config-group-menu/config-group-menu.component';
import { ConfigGroupTitleComponent } from '../commons/config-group-title/config-group-title.component';
import { ConfigurationMessageLoaderModule } from '../commons/config-message/config-message-loader.module';
import { ConfigMessageComponent } from '../commons/config-message/config-message.component';
import { ConfigPreviousNextButtonsComponent } from '../commons/config-previous-next-buttons/config-previous-next-buttons.component';
import { DefaultMessageConfig } from '../commons/config/default-message-config';
import { MessageConfig } from '../commons/config/message-config';
import { GenericConfiguratorModule } from '../generic/generic-configurator.module';

@NgModule({
  imports: [
    CommonModule,
    GenericConfiguratorModule,
    ProductModule,
    ConfigurationMessageLoaderModule,

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
    KeyboardFocusModule,
  ],

  declarations: [
    ConfigPreviousNextButtonsComponent,
    ConfigGroupMenuComponent,
    ConfigGroupTitleComponent,
    ConfigAddToCartButtonComponent,
    ConfigMessageComponent,
  ],
  exports: [
    ConfigPreviousNextButtonsComponent,
    ConfigGroupMenuComponent,
    ConfigGroupTitleComponent,
    ConfigAddToCartButtonComponent,

    ConfigMessageComponent,
  ],
  providers: [UserService, { provide: MessageConfig, useExisting: Config }],
  entryComponents: [
    ConfigPreviousNextButtonsComponent,
    ConfigGroupMenuComponent,
    ConfigGroupTitleComponent,
    ConfigAddToCartButtonComponent,
    ConfigMessageComponent,
  ],
})
export class VariantConfiguratorModule {}
