import { ModuleWithProviders, Type } from '@angular/core';

export interface FeatureEnvironment {
  imports: (any[] | Type<any> | ModuleWithProviders<{}>)[];
}
