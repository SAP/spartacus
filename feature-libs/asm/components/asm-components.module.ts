import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfigModule,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import {
  FormErrorsModule,
  IconModule,
  KeyboardFocusModule,
  ModalModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
  SortingModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    IconModule,
    ModalModule,
    NgSelectModule,
    FormsModule,
    SpinnerModule,
    PasswordVisibilityToggleModule,
    KeyboardFocusModule,
    NgSelectA11yModule,
    SortingModule,
    FeaturesConfigModule,
  ],
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
  ],
  exports: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerListComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
  ],
  providers: [provideConfig(defaultAsmLayoutConfig)],
})
export class AsmComponentsModule {}
