import { WorkspaceProject } from '@schematics/angular/utility/workspace-models';
import {
  getRelativeStyleConfigImportPath,
  getStylesConfigFilePath,
} from './styling-utils';

const sourceRoot = '/src';
const project = { sourceRoot } as WorkspaceProject;

xdescribe('Styling utils', () => {
  xdescribe('getStylesConfigFilePath', () => {
    it('should provide the path of the styles config file in the project source root.', () => {
      const stylesConfigFilePath = getStylesConfigFilePath(sourceRoot);
      expect(stylesConfigFilePath).toEqual(`${sourceRoot}/styles-config.scss`);
    });
  });

  xdescribe('getRelativeStyleConfigImportPath', () => {
    it('should provide a correct relative path for a dest file in the same folder', () => {
      const relativeStyleConfigImportPath = getRelativeStyleConfigImportPath(
        project,
        '/src/styles.scss'
      );
      expect(relativeStyleConfigImportPath).toEqual(`styles-config`);
    });
    it('should provide a correct relative path for a dest file in a feature folder', () => {
      const relativeStyleConfigImportPath = getRelativeStyleConfigImportPath(
        project,
        '/src/spartacus/styles/feature.scss'
      );
      expect(relativeStyleConfigImportPath).toEqual(`../../styles-config`);
    });
  });
});
