import { inject } from '@angular/core';
import { FacadeFactoryService } from './facade-factory.service';
import { FacadeDescriptor } from './facade-descriptor';

/**
 * Factory that will create proxy facade, which is a service that will expose
 * methods and properties from a facade implemented in the lazy loaded module.
 *
 * Returned proxy facade will lazy load the feature and facade implementation
 * at first method call or when first property observable will be subscribed.
 *
 * @param descriptor
 */
export function facadeFactory<T extends object>(
  descriptor: FacadeDescriptor<T>
): T {
  return inject(FacadeFactoryService).create(descriptor);
}
