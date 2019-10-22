import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  AnonymousConsent,
  ANONYMOUS_CONSENT_STATUS,
  ConsentTemplate,
} from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-anonymous-consent-form',
  templateUrl: './anonymous-consent-form.component.html',
})
export class AnonymousConsentFormComponent implements OnInit, OnDestroy {
  consentGiven$ = new BehaviorSubject<boolean>(false);
  consentGivenTranslation$: Observable<string>;

  @Input()
  template: ConsentTemplate;

  @Input()
  consent: AnonymousConsent;

  @Input()
  requiredConsents: string[] = [];

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  constructor() {}

  ngOnInit(): void {
    if (this.consent) {
      this.consentGiven$.next(
        this.consent.consentState === ANONYMOUS_CONSENT_STATUS.GIVEN
      );
    }
    this.consentGivenTranslation$ = this.consentGiven$.pipe(
      map(given =>
        given ? 'anonymousConsents.dialog.on' : 'anonymousConsents.dialog.off'
      )
    );
  }

  onConsentChange(): void {
    this.consentGiven$.next(!this.consentGiven$.value);

    this.consentChanged.emit({
      given: this.consentGiven$.value,
      template: this.template,
    });
  }

  isRequired(templateId: string): boolean {
    return this.requiredConsents.includes(templateId);
  }

  ngOnDestroy(): void {
    this.consentGiven$.unsubscribe();
  }
}
