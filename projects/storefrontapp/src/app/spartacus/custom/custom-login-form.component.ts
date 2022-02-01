import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-custom-login',
  template: `<div>Custom login FORM</div>`,
})
export class CustomLoginFormComponent {
  constructor() {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [CustomLoginFormComponent],
  exports: [CustomLoginFormComponent],
})
export class CustomLoginFormComponentModule {}
