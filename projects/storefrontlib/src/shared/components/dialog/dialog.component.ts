import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'cx-dialog',
  templateUrl: 'dialog.component.html',
})
export class DialogComponent {
  @HostBinding('class') classes = 'modal-dialog modal-dialog-centered modal-lg';
  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.aria-modal') modal = true;
}
