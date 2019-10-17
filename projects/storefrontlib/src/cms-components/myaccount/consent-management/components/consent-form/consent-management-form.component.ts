import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ConsentTemplate } from '@spartacus/core';
import { BehaviorSubject } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';

@Component({
  selector: 'cx-consent-management-form',
  templateUrl: './consent-management-form.component.html',
})
export class ConsentManagementFormComponent implements OnInit {
  iconTypes = ICON_TYPE;
  consentGivenTranslation$ = new BehaviorSubject<string>(
    'consentManagementForm.off'
  );
  accordionExpanded = false;
  accordionHeight = '0px';
  consentGiven = false;

  @ViewChild('accordionContent', { static: false })
  accordionContent: ElementRef<HTMLDivElement>;

  @Input()
  consentTemplate: ConsentTemplate;

  @Input()
  requiredConsents: string[] = [];

  // TODO(issue:4989) Anonymous consents - remove
  @Input()
  isAnonymousConsentsEnabled = false;

  @Output()
  consentChanged = new EventEmitter<{
    given: boolean;
    template: ConsentTemplate;
  }>();

  constructor() {}

  ngOnInit(): void {
    if (this.consentTemplate && this.consentTemplate.currentConsent) {
      if (this.consentTemplate.currentConsent.consentWithdrawnDate) {
        this.consentGiven = false;
        this.consentGivenTranslation$.next('consentManagementForm.off');
      } else if (this.consentTemplate.currentConsent.consentGivenDate) {
        this.consentGiven = true;
        this.consentGivenTranslation$.next('consentManagementForm.on');
      }
    }
  }

  onConsentChange(): void {
    this.consentGiven = !this.consentGiven;
    if (this.consentGiven) {
      this.consentGivenTranslation$.next('consentManagementForm.on');
    } else {
      this.consentGivenTranslation$.next('consentManagementForm.off');
    }

    this.consentChanged.emit({
      given: this.consentGiven,
      template: this.consentTemplate,
    });
  }

  toggleAccordion(keyEvent?: KeyboardEvent): void {
    let expand = true;
    if (keyEvent && keyEvent.key !== ' ' && keyEvent.key !== 'Enter') {
      expand = false;
    }

    if (expand) {
      this.accordionExpanded = !this.accordionExpanded;
      this.accordionHeight = this.accordionExpanded
        ? `${this.accordionContent.nativeElement.clientHeight}px`
        : '0px';
    }
  }

  isRequired(templateId: string): boolean {
    // TODO(issue:4989) Anonymous consents - remove this.isAnonymousConsentsEnabled check
    return this.isAnonymousConsentsEnabled
      ? this.requiredConsents.includes(templateId)
      : false;
  }
}
