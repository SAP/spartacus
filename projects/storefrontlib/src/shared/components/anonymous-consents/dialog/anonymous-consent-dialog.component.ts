import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ConsentTemplate,
} from '@spartacus/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';
import { ICON_TYPE } from '../../../../cms-components/misc/icon/index';
import { FocusConfig } from '../../../../layout/a11y/keyboard-focus/index';

@Component({
  selector: 'cx-anonymous-consent-dialog',
  templateUrl: './anonymous-consent-dialog.component.html',
})
export class AnonymousConsentDialogComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();

  showLegalDescription = true;
  iconTypes = ICON_TYPE;
  requiredConsents: string[] = [];

  loading$: Observable<boolean>;
  templates$: Observable<ConsentTemplate[]>;
  consents$: Observable<AnonymousConsent[]>;

  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: true,
  };

  @Output()
  closeDialog: EventEmitter<string> = new EventEmitter();

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.closeModal('Cross click');
    }
  }

  constructor(
    private config: AnonymousConsentsConfig,
    private anonymousConsentsService: AnonymousConsentsService,
    private el: ElementRef
  ) {
    if (Boolean(this.config.anonymousConsents)) {
      this.showLegalDescription = this.config.anonymousConsents.showLegalDescriptionInDialog;
      if (Boolean(this.config.anonymousConsents.requiredConsents)) {
        this.requiredConsents = this.config.anonymousConsents.requiredConsents;
      }
    }
  }

  ngOnInit(): void {
    this.templates$ = this.anonymousConsentsService.getTemplates();
    this.consents$ = this.anonymousConsentsService.getConsents();
    this.loading$ = this.anonymousConsentsService.getLoadTemplatesLoading();
  }

  closeModal(reason?: any): void {
    this.closeDialog.emit(reason);
  }

  rejectAll(): void {
    this.subscriptions.add(
      combineLatest([this.templates$, this.consents$])
        .pipe(
          take(1),
          distinctUntilChanged(),
          tap(([templates, consents]) =>
            templates.forEach((template) => {
              const consent = this.getCorrespondingConsent(template, consents);
              if (this.anonymousConsentsService.isConsentGiven(consent)) {
                if (this.isRequiredConsent(template)) {
                  return;
                }

                this.anonymousConsentsService.withdrawConsent(template.id);
              }
            })
          )
        )
        .subscribe()
    );
    this.closeModal('rejectAll');
  }

  allowAll(): void {
    this.subscriptions.add(
      combineLatest([this.templates$, this.consents$])
        .pipe(
          take(1),
          distinctUntilChanged(),
          tap(([templates, consents]) =>
            templates.forEach((template) => {
              const consent = this.getCorrespondingConsent(template, consents);
              if (
                (consent && consent.consentState == null) ||
                this.anonymousConsentsService.isConsentWithdrawn(consent)
              ) {
                if (this.isRequiredConsent(template)) {
                  return;
                }

                this.anonymousConsentsService.giveConsent(template.id);
              }
            })
          )
        )
        .subscribe()
    );
    this.closeModal('allowAll');
  }

  private isRequiredConsent(template: ConsentTemplate): boolean {
    return (
      Boolean(this.config.anonymousConsents) &&
      Boolean(this.config.anonymousConsents.requiredConsents) &&
      this.config.anonymousConsents.requiredConsents.includes(template.id)
    );
  }

  onConsentChange({
    given,
    template,
  }: {
    given: boolean;
    template: ConsentTemplate;
  }): void {
    if (given) {
      this.anonymousConsentsService.giveConsent(template.id);
    } else {
      this.anonymousConsentsService.withdrawConsent(template.id);
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
