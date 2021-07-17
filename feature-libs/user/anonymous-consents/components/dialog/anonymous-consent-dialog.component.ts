import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import {
  AnonymousConsentsConfig,
  AnonymousConsentsService,
} from '@spartacus/user/anonymous-consents/core';
import {
  AnonymousConsent,
  ConsentTemplate,
} from '@spartacus/user/anonymous-consents/root';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, take, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-anonymous-consent-dialog',
  templateUrl: './anonymous-consent-dialog.component.html',
})
export class AnonymousConsentDialogComponent implements OnInit, OnDestroy {
  @HostBinding('attr.role') role = 'dialog';
  @HostBinding('attr.aria-modal') modal = true;

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
    autofocus: 'input[type="checkbox"]',
    focusOnEscape: true,
  };

  @HostListener('click', ['$event'])
  handleClick(event: UIEvent): void {
    // Close on click outside the dialog window
    if ((event.target as any).tagName === this.el.nativeElement.tagName) {
      this.close('Cross click');
    }
  }

  constructor(
    protected config: AnonymousConsentsConfig,
    protected anonymousConsentsService: AnonymousConsentsService,
    protected el: ElementRef,
    protected launchDialogService: LaunchDialogService
  ) {
    this.showLegalDescription =
      this.config.anonymousConsents?.showLegalDescriptionInDialog ?? true;
    this.requiredConsents =
      this.config.anonymousConsents?.requiredConsents ?? [];
  }

  ngOnInit(): void {
    this.templates$ = this.anonymousConsentsService.getTemplates();
    this.consents$ = this.anonymousConsentsService.getConsents();
    this.loading$ = this.anonymousConsentsService.getLoadTemplatesLoading();
  }

  close(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
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
    this.close('rejectAll');
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
    this.close('allowAll');
  }

  private isRequiredConsent(template: ConsentTemplate): boolean {
    return (
      this.config.anonymousConsents?.requiredConsents?.includes(template.id) ??
      false
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
  ): AnonymousConsent | undefined {
    for (const consent of consents) {
      if (template.id === consent.templateCode) {
        return consent;
      }
    }
    return undefined;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
