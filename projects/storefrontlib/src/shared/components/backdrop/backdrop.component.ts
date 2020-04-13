import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'cx-backdrop',
  template: '',
})
export class BackdropComponent {
  @HostBinding('class') classes = 'modal-backdrop fade show';
  @HostBinding(`style.z-index`) style = '1050';
}
