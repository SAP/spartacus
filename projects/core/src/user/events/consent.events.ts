import { CxEvent } from '../../event/cx-event';
import { AnonymousConsent, ConsentTemplate } from '../../model/consent.model';

export class ConsentWithdrawnEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ConsentWithdrawnEvent';
  consent: string;
}
export class ConsentGivenEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'ConsentGivenEvent';
  consent: string;
}
export class AnonymousConsentsSetEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'AnonymousConsentsSetEvent';
  consentTemplates: AnonymousConsent[];
}
export class UserConsentsLoadedEvent extends CxEvent {
  /**
   * Event's type
   */
  static readonly type = 'UserConsentsLoadedEvent';
  consentTemplates: ConsentTemplate[];
}
