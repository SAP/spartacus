import { Rule, Tree } from '@angular-devkit/schematics';
import { getProjectStyleFile } from '@angular/cdk/schematics';
import { italic, red } from '@angular-devkit/core/src/terminal';
import { UTF_8 } from '../../shared';
import { getProject } from '@schematics/angular/utility/project';
import { getDefaultProjectNameFromWorkspace } from '../../shared/utils/workspace-utils';

export function migrate(): Rule {
  return (tree: Tree) => {
    const projectName = getDefaultProjectNameFromWorkspace(tree);
    const project = getProject(tree, projectName);
    const styleFilePath = getProjectStyleFile(project);

    if (!styleFilePath) {
      console.warn(
        red(`Could not find the default style file for this project.`)
      );
      console.warn(red(`Please consider manually setting up spartacus styles`));
      return;
    }

    if (styleFilePath.split('.').pop() !== 'scss') {
      console.warn(
        red(`Could not find the default SCSS style file for this project. `)
      );
      console.warn(
        red(
          `Please make sure your project is configured with SCSS and consider manually setting up spartacus styles.`
        )
      );
      return;
    }

    const buffer = tree.read(styleFilePath);

    if (!buffer) {
      console.warn(
        red(
          `Could not read the default style file within the project ` +
            `(${italic(styleFilePath)})`
        )
      );
      console.warn(red(`Please consider manually importing spartacus styles.`));
      return;
    }

    const stylesImport = "@import '~@spartacus/styles/index'";
    const stylesFile = buffer.toString(UTF_8);
    const spartacusImportIndex = stylesFile.indexOf(stylesImport);

    if (spartacusImportIndex === -1) {
      console.warn(red('Could not find spartacus styles import in file'));
      console.warn(
        red(
          `Please consider manually importing spartacus styles along with $styleVersion variable.`
        )
      );
      return;
    }

    const insertion = `\n$styleVersion: 2.1;\n`;

    const recorder = tree.beginUpdate(styleFilePath);
    recorder.insertLeft(spartacusImportIndex, insertion);
    return tree.commitUpdate(recorder);
  };
}
