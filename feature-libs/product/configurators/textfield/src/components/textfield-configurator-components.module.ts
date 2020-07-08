import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfigTextfieldAddToCartButtonComponent } from './config-textfield-add-to-cart-button/config-textfield-add-to-cart-button.component';
import { ConfigTextfieldFormComponent } from './config-textfield-form/config-textfield-form.component';
import { ConfigTextfieldInputFieldComponent } from './config-textfield-input-field/config-textfield-input-field.component';

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    CommonModule,
    I18nModule,
    UrlModule,
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
  entryComponents: [
    ConfigTextfieldFormComponent,
    ConfigTextfieldInputFieldComponent,
    ConfigTextfieldAddToCartButtonComponent,
  ],
})
export class TextfieldConfiguratorComponentsModule {}
