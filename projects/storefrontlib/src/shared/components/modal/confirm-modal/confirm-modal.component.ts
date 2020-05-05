import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ModalService } from '../../../../shared/components/modal/modal.service';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/icon.model';

@Component({
  selector: 'cx-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent {
  @Input() title: string;
  @Input() message: string;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter();

  iconTypes = ICON_TYPE;

  constructor(protected modalService: ModalService) {}

  onConfirm() {
    this.confirm.emit(true);
    this.modalService.closeActiveModal();
  }

  dismissModal(reason?: any): void {
    this.modalService.dismissActiveModal(reason);
  }
}
