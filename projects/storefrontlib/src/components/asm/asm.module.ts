import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AsmMainUiComponent } from './asm-main-ui/asm-main-ui.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [
    AsmMainUiComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
  ],
  exports: [AsmMainUiComponent],
})
export class AsmModule {}
