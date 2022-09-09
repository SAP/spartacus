import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { JsonLdDirective } from './json-ld.directive';
import { StructuredDataFactory } from './structured-data.factory';

/**
 * Factory to build the structure data
 * without any interaction with the UI.
 */
export function getStructuredDataFactory(injector: Injector): () => void {
  const result = () => {
    const factory = injector.get(StructuredDataFactory);
    factory.build();
  };
  return result;
}

@NgModule({
  imports: [CommonModule],
  declarations: [JsonLdDirective],
  exports: [JsonLdDirective],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: getStructuredDataFactory,
      deps: [Injector],
      multi: true,
    },
  ],
})
export class StructuredDataModule {}
