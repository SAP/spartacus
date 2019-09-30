import { Component, OnInit } from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsService,
  ConsentTemplate,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ModalService } from '../../modal';

@Component({
  selector: 'cx-anonymous-consents-dialog',
  templateUrl: './anonymous-consents-dialog.component.html',
})
export class AnonymousConsentsDialogComponent implements OnInit {
  iconTypes = ICON_TYPE;

  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  constructor(
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {}

  ngOnInit(): void {
    this.templates$ = this.anonymousConsentsService.getAnonymousConsentTemplates();
    this.consents$ = this.anonymousConsentsService.getAnonymousConsents();
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    if (given) {
      this.anonymousConsentsService.giveAnonymousConsent(template.id);
    } else {
      this.anonymousConsentsService.withdrawAnonymousConsent(template.id);
    }
  }
}
