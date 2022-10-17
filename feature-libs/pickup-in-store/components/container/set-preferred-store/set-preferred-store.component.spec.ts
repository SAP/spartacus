import { Component, Input } from '@angular/core';
import { PointOfServiceNames } from '@spartacus/pickup-in-store/core';

/**
 * This is a stub of the SetPreferredStoreComponent with the same inputs
 * for the purposes of testing the components that wrap it.
 */
@Component({
  selector: 'cx-set-preferred-store',
  template: '',
})
export class SetPreferredStoreStubComponent {
  @Input() pointOfServiceName: PointOfServiceNames;
}
