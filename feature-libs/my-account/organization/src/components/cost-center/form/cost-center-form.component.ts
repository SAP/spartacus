import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-cost-center-form',
  templateUrl: './cost-center-form.component.html',
})
export class CostCenterFormComponent {
  /**
   * The form is controlled from the container component.
   */
  @Input() form: FormGroup;

  constructor() {}
}
