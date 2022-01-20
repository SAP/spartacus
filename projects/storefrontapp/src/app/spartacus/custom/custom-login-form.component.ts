import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';

@Component({
  selector: 'app-custom-login',
  template: `<div>Custom login FORM</div> `,
})
export class CustomLoginFormComponent {
  constructor() {}
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
  ],
  declarations: [CustomLoginFormComponent],
  exports: [CustomLoginFormComponent],
})
export class CustomLoginFormComponentModule {}
