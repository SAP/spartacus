import { ModuleWithProviders, Type } from '@angular/core';

export interface FeatureEnvironment {
  imports: Array<Type<any> | ModuleWithProviders<{}>>;
}
