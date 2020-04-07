import { externalSchematic, Rule } from '@angular-devkit/schematics';
import { ANGULAR_LOCALIZE } from '../../../shared/constants';

export function migrate(): Rule {
  return () => {
    return externalSchematic(ANGULAR_LOCALIZE, 'ng-add', {});
  };
}
