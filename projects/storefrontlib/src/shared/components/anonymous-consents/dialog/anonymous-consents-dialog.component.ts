import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ConsentTemplate,
} from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { ModalService } from '../../modal/index';

@Component({
  selector: 'cx-anonymous-consents-dialog',
  templateUrl: './anonymous-consents-dialog.component.html',
})
export class AnonymousConsentsDialogComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  showLegalDescription = true;
  iconTypes = ICON_TYPE;
  requiredConsents: string[] = [];

  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  constructor(
    private config: AnonymousConsentsConfig,
    private modalService: ModalService,
    private anonymousConsentsService: AnonymousConsentsService
  ) {
    if (Boolean(this.config.anonymousConsents)) {
      this.showLegalDescription = this.config.anonymousConsents.showLegalDescriptionInDialog;
      if (Boolean(this.config.anonymousConsents.requiredConsents)) {
        this.requiredConsents = this.config.anonymousConsents.requiredConsents;
      }
    }
  }

  ngOnInit(): void {
    this.templates$ = this.anonymousConsentsService.getAnonymousConsentTemplates();
    this.consents$ = this.anonymousConsentsService.getAnonymousConsents();
  }

  closeModal(reason?: any): void {
    this.modalService.closeActiveModal(reason);
  }

  rejectAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService.withdrawAllAnonymousConsents().subscribe()
    );
    this.closeModal('rejectAll');
  }

  allowAll(): void {
    this.subscriptions.add(
      this.anonymousConsentsService.giveAllAnonymousConsents().subscribe()
    );
    this.closeModal('allowAll');
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

  getCorrespondingConsent(
    template: ConsentTemplate,
    consents: AnonymousConsent[] = []
  ): AnonymousConsent {
    for (const consent of consents) {
      if (template.id === consent.templateCode) {
        return consent;
      }
    }
    return null;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
