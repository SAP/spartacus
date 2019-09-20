import {
  chain,
  ExecutionOptions,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { Schema as SpartacusOptions } from '../add-spartacus/schema';
import { of } from 'rxjs';
import { branch } from '@angular-devkit/schematics/src/tree/static';

/**
 * We have to use our custom function because pwa schematics is currently private
 * so it's not possible to reuse it via standard externalSchematics
 */
function privateExternalSchematic<OptionT extends object>(
  collectionName: string,
  schematicName: string,
  options: OptionT,
  executionOptions?: Partial<ExecutionOptions>
): Rule {
  return (input: Tree, context: SchematicContext) => {
    const collection = context.engine.createCollection(collectionName);
    const schematic = collection.createSchematic(schematicName, true);
    return schematic.call(
      options,
      of(branch(input)),
      context,
      executionOptions
    );
  };
}

export function addPWA(options: SpartacusOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    return chain([
      privateExternalSchematic('@angular/pwa', 'ng-add', {
        project: options.project,
      }),
    ])(tree, context);
  };
}
