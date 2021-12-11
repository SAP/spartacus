import {
  chain,
  noop,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addLibraryFeature,
  addPackageJsonDependenciesForLibrary,
  CLI_CHATBOT_FEATURE,
  LibraryOptions as SpartacusChatBotOptions,
  readPackageJson,
  shouldAddFeature,
  SPARTACUS_CHATBOT,
  CHATBOT_MODULE,
  CHAT_BOT_SCSS_FILE_NAME,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';
import {
  SPARTACUS_CHATBOT_ASSETS,
  SPARTACUS_CHATBOT_ROOT,
  CHATBOT_FEATURE_NAME_CONSTANT,
  CHATBOT_FOLDER_NAME,
  CHATBOT_MODULE_NAME,
  CHATBOT_ROOT_MODULE,
  CHATBOT_TRANSLATIONS,
  CHATBOT_TRANSLATION_CHUNKS_CONFIG,
} from '../constants';

export function addChatBotFeatures(options: SpartacusChatBotOptions): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    return chain([
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      shouldAddFeature(CLI_CHATBOT_FEATURE, options.features)
        ? addChatBotFeature(options)
        : noop(),
    ]);
  };
}

function addChatBotFeature(options: SpartacusChatBotOptions): Rule {
  return addLibraryFeature(options, {
    folderName: CHATBOT_FOLDER_NAME,
    moduleName: CHATBOT_MODULE_NAME,
    featureModule: {
      name: CHATBOT_MODULE,
      importPath: SPARTACUS_CHATBOT,
    },
    rootModule: {
      name: CHATBOT_ROOT_MODULE,
      importPath: SPARTACUS_CHATBOT_ROOT,
    },
    lazyLoadingChunk: {
      moduleSpecifier: SPARTACUS_CHATBOT_ROOT,
      namedImports: [CHATBOT_FEATURE_NAME_CONSTANT],
    },
    i18n: {
      resources: CHATBOT_TRANSLATIONS,
      chunks: CHATBOT_TRANSLATION_CHUNKS_CONFIG,
      importPath: SPARTACUS_CHATBOT_ASSETS,
    },
    styles: {
      scssFileName: CHAT_BOT_SCSS_FILE_NAME,
      importStyle: SPARTACUS_CHATBOT,
    },
  });
}
