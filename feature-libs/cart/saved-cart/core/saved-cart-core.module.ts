import { ModuleWithProviders, NgModule } from '@angular/core';

@NgModule({
  imports: [],
})
export class SavedCartCoreModule {
  static forRoot(): ModuleWithProviders<SavedCartCoreModule> {
    return {
      ngModule: SavedCartCoreModule,
      providers: [],
    };
  }
}
