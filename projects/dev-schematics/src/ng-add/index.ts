import {
  chain,
  Rule,
  schematic,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';

export default function (options: any): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      // do check if spartacus schematics
      // externalSchematic(SPARTACUS_SCHEMATICS, 'ng-add', options),

      schematic('add-baseSite', options),
      schematic('add-test-outlets', options),
      schematic('add-routing', options),
    ])(host, context);
  };
}
