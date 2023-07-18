import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CxErrorHandlerEffect } from './cx-error-handler.effect';
import { EffectsErrorHandlerService } from './effects-error-handler.service';

@NgModule({
  imports: [EffectsModule.forFeature([CxErrorHandlerEffect])],
})
export class EffectsErrorHandlerModule {
  static forRoot(): ModuleWithProviders<EffectsErrorHandlerModule> {
    return {
      ngModule: EffectsErrorHandlerModule,
      providers: [EffectsErrorHandlerService],
    };
  }
}
