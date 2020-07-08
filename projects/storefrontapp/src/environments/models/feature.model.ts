import { ModuleWithProviders, Type } from '@angular/core';

export interface FeatureEnvironment {
  imports: Type<any>[] | ModuleWithProviders<any>[];
}
