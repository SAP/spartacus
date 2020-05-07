import { ModuleWithProviders, NgModule } from '@angular/core';
import { ProcessStoreModule } from './store/process-store.module';

@NgModule({
  imports: [ProcessStoreModule],
})
export class ProcessModule {
  static forRoot(): ModuleWithProviders<ProcessModule> {
    return {
      ngModule: ProcessModule,
      providers: [],
    };
  }
}
