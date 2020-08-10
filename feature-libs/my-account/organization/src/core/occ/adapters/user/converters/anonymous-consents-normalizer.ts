import { Injectable } from '@angular/core';
import { AnonymousConsentsService } from '../../../../../../../../../projects/core/src/anonymous-consents/facade/anonymous-consents.service';
import { AnonymousConsent } from '../../../../../../../../../projects/core/src/model/consent.model';
import { Converter } from '../../../../../../../../../projects/core/src/util/converter.service';

@Injectable({ providedIn: 'root' })
export class AnonymousConsentNormalizer
  implements Converter<string, AnonymousConsent[]> {
  constructor(protected anonymousConsentsService: AnonymousConsentsService) {}

  convert(source: string, target: AnonymousConsent[] = []): AnonymousConsent[] {
    target = this.anonymousConsentsService.decodeAndDeserialize(source);
    return target;
  }
}
