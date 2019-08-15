import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { AsmComponent } from './asm/asm.component';
import { CSAgentLoginFormComponent } from './csagent-login-form/csagent-login-form.component';
import { CustomerSelectionComponent } from './customer-selection/customer-selection.component';
@NgModule({
  imports: [CommonModule, ReactiveFormsModule, I18nModule],
  declarations: [
    AsmComponent,
    CSAgentLoginFormComponent,
    CustomerSelectionComponent,
  ],
  exports: [AsmComponent],
})
export class AsmModule {}
