import { Component, Input } from '@angular/core';
import { timezones } from './timezones';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cx-select-timezone',
  templateUrl: './select-timezone.component.html',
})
export class SelectTimezoneComponent {
  @Input() fg: FormGroup;
  @Input() controlName: string;

  items = timezones;
}
