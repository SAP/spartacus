import { Injectable } from '@angular/core';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class FormErrorsService {
  constructor(protected globalMessageService: GlobalMessageService) {}

  showFormErrorGlobalMessage(): void {
    this.globalMessageService.add(
      {
        key: 'formErrors.globalMessage',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  }
}
