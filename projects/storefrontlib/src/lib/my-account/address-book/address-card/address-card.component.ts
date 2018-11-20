import { Component, Input } from '@angular/core';
import { Address } from '@spartacus/core';

@Component({
  selector: 'cx-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent {
  editMode: boolean;
  isDefault: boolean;

  @Input()
  address: Address;

  constructor() {}

  cancelEdit() {
    this.editMode = false;
  }

  setEditMode() {
    this.editMode = true;
  }

  setDefault() {
    this.isDefault = true;
  }
}
