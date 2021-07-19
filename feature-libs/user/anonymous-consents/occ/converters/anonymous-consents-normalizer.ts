import { Injectable } from '@angular/core';
import { Converter } from '@spartacus/core';
import { AnonymousConsentsService } from '@spartacus/user/anonymous-consents/core';
import { AnonymousConsent } from '@spartacus/user/anonymous-consents/root';

// TODO:#anon - check provided in root
@Injectable({ providedIn: 'root' })
export class AnonymousConsentNormalizer
  implements Converter<string, AnonymousConsent[]> {
  constructor(protected anonymousConsentsService: AnonymousConsentsService) {}

  convert(source: string): AnonymousConsent[] {
    return this.anonymousConsentsService.decodeAndDeserialize(source);
  }
}
