import { NgModule } from '@angular/core';
import { PersonalizationContextService } from './services/personalization-context.service';

@NgModule({})
export class PersonalizationCoreModule {
  constructor(_personalizationContextService: PersonalizationContextService) {}
}
