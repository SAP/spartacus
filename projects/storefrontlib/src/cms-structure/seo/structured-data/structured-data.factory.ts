import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { SchemaBuilder } from './builders/schema.interface';
import { SCHEMA_BUILDER } from './builders/tokens';
import { JsonLdScriptFactory } from './json-ld-script.factory';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataFactory implements OnDestroy {
  constructor(
    private scriptBuilder: JsonLdScriptFactory,
    @Optional()
    @Inject(SCHEMA_BUILDER)
    private builders: SchemaBuilder[]
  ) {}

  private subscription: Subscription;

  build() {
    this.subscription = this.collectSchemas().subscribe((schema: {}[]) => {
      this.scriptBuilder.build(schema);
    });
  }

  private collectSchemas(): Observable<any[]> {
    if (!this.scriptBuilder.isJsonLdRequired() || !this.builders) {
      return of();
    }
    return combineLatest(
      this.builders.map((builder) => builder.build())
    ).pipe();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
