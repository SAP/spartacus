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
import { ConfigConflictDescriptionComponent } from '../commons/config-conflict-description/config-conflict-description.component';
import { ConfigConflictSuggestionComponent } from '../commons/config-conflict-suggestion/config-conflict-suggestion.component';
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
    KeyboardFocusModule,
  ],

  declarations: [
    ConfigGroupMenuComponent,
    ConfigConflictSuggestionComponent,
    ConfigConflictDescriptionComponent,
  ],
  exports: [
    ConfigGroupMenuComponent,
    ConfigConflictSuggestionComponent,
    ConfigConflictDescriptionComponent,
  ],
  providers: [UserService, { provide: MessageConfig, useExisting: Config }],
  entryComponents: [
    ConfigGroupMenuComponent,
    ConfigConflictSuggestionComponent,
    ConfigConflictDescriptionComponent,
  ],
})
export class VariantConfiguratorModule {}
