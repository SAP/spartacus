import { NgModule } from '@angular/core';
import { privateProviders } from './private/private.providers';

@NgModule({
  imports: [],
  providers: [privateProviders],
})
export class TestModule {}
