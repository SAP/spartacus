/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  MessageComponentModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
  SortingModule,
  SpinnerModule,
  PaginationModule,
} from '@spartacus/storefront';
import { AsmBindCartDialogComponent } from './asm-bind-cart-dialog/asm-bind-cart-dialog.component';
import { AsmBindCartComponent } from './asm-bind-cart/asm-bind-cart.component';
import { AsmCreateCustomerFormComponent } from './asm-create-customer-form/asm-create-customer-form.component';
import { defaultAsmCreateCustomerFormLayoutConfig } from './asm-create-customer-form/default-asm-create-customer-form-layout.config';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSaveCartDialogComponent } from './asm-save-cart-dialog/asm-save-cart-dialog.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { defaultCustomerListLayoutConfig } from './customer-list/default-customer-list-layout.config';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
import { defaultBindCartLayoutConfig } from './default-bind-cart-layout.config';
import { defaultSaveCartLayoutConfig } from './default-save-cart-layout.config';
import { DotSpinnerComponent } from './dot-spinner/dot-spinner.component';
import { defaultAsmPaginationConfig } from './default-asm-pagination.config';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    IconModule,
    NgSelectModule,
    FormsModule,
    SpinnerModule,
    PasswordVisibilityToggleModule,
    KeyboardFocusModule,
    NgSelectA11yModule,
    SortingModule,
    PaginationModule,
    MessageComponentModule,
    FeaturesConfigModule,
  ],
  declarations: [
    AsmBindCartDialogComponent,
    AsmSaveCartDialogComponent,
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    DotSpinnerComponent,
    AsmCreateCustomerFormComponent,
  ],
  exports: [
    AsmBindCartDialogComponent,
    AsmSaveCartDialogComponent,
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    DotSpinnerComponent,
    AsmCreateCustomerFormComponent,
  ],
  providers: [
    provideDefaultConfig(defaultAsmLayoutConfig),
    provideDefaultConfig(defaultBindCartLayoutConfig),
    provideDefaultConfig(defaultSaveCartLayoutConfig),
    provideDefaultConfig(defaultCustomerListLayoutConfig),
    provideDefaultConfig(defaultAsmPaginationConfig),
    provideDefaultConfig(defaultAsmCreateCustomerFormLayoutConfig),
  ],
})
export class AsmComponentsModule {}
