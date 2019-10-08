import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  isDevMode,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { SchemaBuilder } from './builders/schema.interface';
import { SCHEMA_BUILDER } from './builders/tokens';
@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  constructor(
    @Inject(PLATFORM_ID) protected platformId: any,
    @Optional()
    @Inject(SCHEMA_BUILDER)
    protected builders: SchemaBuilder[]
  ) {}

  load(): Observable<any> {
    if (this.isRequired() && this.builders) {
      return combineLatest(
        this.builders.map(builder => builder.build())
      ).pipe();
    }
    return of();
  }

  /**
   * Only return schema data in case of SSR or development mode,
   * to not waste memory unnecessary.
   */
  private isRequired(): boolean {
    return isPlatformBrowser(this.platformId) || isDevMode();
  }
}
