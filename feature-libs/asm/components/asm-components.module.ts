import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  FeaturesConfigModule,
  I18nModule,
  provideConfig,
} from '@spartacus/core';
import { AsmBindCartComponent } from './asm-bind-cart/asm-bind-cart.component';
import {
  FormErrorsModule,
  IconModule,
  ModalModule,
  PopoverModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { AsmSessionTimerComponent } from './asm-session-timer/asm-session-timer.component';
import { FormatTimerPipe } from './asm-session-timer/format-timer.pipe';
import { AsmToggleUiComponent } from './asm-toggle-ui/asm-toggle-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerEmulationComponent } from './customer-emulation/customer-emulation.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
import { defaultAsmLayoutConfig } from './default-asm-layout.config';
import { DotSpinnerComponent } from './dot-spinner/dot-spinner.component';
import { AsmCustomer360ComponentModule } from './asm-customer-360/asm-customer-360.component.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    I18nModule,
    FormErrorsModule,
    PasswordVisibilityToggleModule,
    IconModule,
    PopoverModule,
    ModalModule,
    NgSelectModule,
    FormsModule,
    FeaturesConfigModule,
    AsmCustomer360ComponentModule,
  ],
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    DotSpinnerComponent,
  ],
  exports: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
    AsmSessionTimerComponent,
    FormatTimerPipe,
    CustomerEmulationComponent,
    AsmToggleUiComponent,
    AsmBindCartComponent,
    AsmCustomer360ComponentModule,
    DotSpinnerComponent,
  ],
  providers: [provideConfig(defaultAsmLayoutConfig)],
})
export class AsmComponentsModule {}
