/// <reference types="jest" />

import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing';
import {
  Schema as ApplicationOptions,
  Style,
} from '@schematics/angular/application/schema';
import { Schema as WorkspaceOptions } from '@schematics/angular/workspace/schema';
import * as path from 'path';
import { InMemoryFileSystemHost, Project, SourceFile } from 'ts-morph';
import { getSpartacusProviders } from './config-utils';

const collectionPath = path.join(__dirname, '../../collection.json');
const schematicRunner = new SchematicTestRunner('schematics', collectionPath);

describe('Storefront config utils', () => {
  let appTree: UnitTestTree;
  const workspaceOptions: WorkspaceOptions = {
    name: 'workspace',
    version: '0.5.0',
  };
  const appOptions: ApplicationOptions = {
    name: 'schematics-test',
    inlineStyle: false,
    inlineTemplate: false,
    routing: false,
    style: Style.Scss,
    skipTests: false,
    projectRoot: '',
  };
  const defaultOptions = {
    project: 'schematics-test',
  };

  beforeEach(async () => {
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'workspace',
        workspaceOptions
      )
      .toPromise();
    appTree = await schematicRunner
      .runExternalSchematicAsync(
        '@schematics/angular',
        'application',
        appOptions,
        appTree
      )
      .toPromise();
    appTree = await schematicRunner
      .runSchematicAsync('add-spartacus', defaultOptions, appTree)
      .toPromise();
  });

  describe('ts-morph config utils', () => {
    const configFileContent = `
import { NgModule } from '@angular/core';
import {
CartAddEntrySuccessEvent,
CartRemoveEntrySuccessEvent,
provideConfig,
} from '@spartacus/core';
import { NavigationEvent, defaultCmsContentProviders } from '@spartacus/storefront';
import { PersonalizationRootModule } from '@spartacus/tracking/personalization/root';
import { AepModule } from '@spartacus/tracking/tms/aep';
import { BaseTmsModule, TmsConfig } from '@spartacus/tracking/tms/core';
import { GtmModule } from '@spartacus/tracking/tms/gtm';
import { someFunction, someSpread } from '@some/package';

@NgModule({
imports: [
BaseTmsModule.forRoot(),
GtmModule,
AepModule,
PersonalizationRootModule,
],
providers: [
someFunction(),
...someSpread,
...defaultCmsContentProviders,
provideConfig(<TmsConfig>{
  tagManager: {
    gtm: {
      events: [NavigationEvent, CartAddEntrySuccessEvent],
    },
    aep: {
      events: [NavigationEvent, CartRemoveEntrySuccessEvent],
    },
  },
}),
provideConfig({
  featureModules: {
    personalization: {
      module: () =>
        import('@spartacus/tracking/personalization').then(
          (m) => m.PersonalizationModule
        ),
    },
  },
}),
],
})
export class TrackingFeatureModule {}
`;
    let sourceFile: SourceFile;

    beforeAll(() => {
      const project = new Project({
        fileSystem: new InMemoryFileSystemHost(),
      });
      sourceFile = project.createSourceFile('test.ts', configFileContent);
    });

    describe('getSpartacusProviders', () => {
      it('should return all providers from spartacus in file', () => {
        const providers = getSpartacusProviders(sourceFile);
        expect(providers.length).toEqual(3);
        expect(providers[0].getText()).toMatchSnapshot();
        expect(providers[1].getText()).toMatchSnapshot();
        expect(providers[2].getText()).toMatchSnapshot();
      });
    });
  });
});
