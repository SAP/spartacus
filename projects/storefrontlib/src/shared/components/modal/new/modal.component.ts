import { Component, HostBinding } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ModalComponentService } from './modal-component.service';

@Component({
  selector: 'cx-modal',
  templateUrl: 'modal.component.html',
})
export class ModalComponent {
  @HostBinding('class.hidden') disabled = true;
  $open = this.modalComponentService.opened.pipe(
    tap(opened => (this.disabled = !opened))
  );

  constructor(protected modalComponentService: ModalComponentService) {}
}
