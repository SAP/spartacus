import { Inject, Injectable, Optional } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { SchemaBuilder } from './builders/schema.interface';
import { SCHEMA_BUILDER } from './builders/tokens';
import { JsonLdScriptFactory } from './json-ld-script.factory';

@Injectable({
  providedIn: 'root',
})
export class StructuredDataFactory {
  constructor(
    private scriptBuilder: JsonLdScriptFactory,
    @Optional()
    @Inject(SCHEMA_BUILDER)
    private builders: SchemaBuilder[]
  ) {}

  build() {
    this.collectSchemas().subscribe((schema: {}[]) => {
      this.scriptBuilder.build(schema);
    });
  }

  private collectSchemas(): Observable<any[]> {
    if (!this.scriptBuilder.isJsonLdRequired() || !this.builders) {
      return of();
    }
    return combineLatest(this.builders.map(builder => builder.build())).pipe();
  }
}
