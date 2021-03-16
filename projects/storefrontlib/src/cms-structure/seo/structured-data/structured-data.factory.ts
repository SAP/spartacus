import { Inject, Injectable, OnDestroy, Optional } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { SchemaBuilder } from './builders/schema.interface';
import { SCHEMA_BUILDER } from './builders/tokens';
import { JsonLdScriptFactory } from './json-ld-script.factory';

/**
 * Factory service that is used to build the structured data for
 * all configured schema builders.
 */
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

  protected subscription: Subscription = new Subscription();

  /**
   * Initiates the build of structured data by collecting all schema
   * builders.
   */
  build(): void {
    if (this.scriptBuilder.isJsonLdRequired() && this.builders) {
      this.subscription.add(
        this.collectSchemas().subscribe((schema: {}[]) => {
          this.scriptBuilder.build(schema);
        })
      );
    }
  }

  /**
   * Collects all schema builders and observe their structured data.
   */
  protected collectSchemas(): Observable<any[]> {
    return combineLatest(this.builders.map((builder) => builder.build()));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
