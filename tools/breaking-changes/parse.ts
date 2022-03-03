import * as fs from 'fs';
import * as glob from 'glob';

const spartacusHomeDir = process.argv[2];
console.log(`Parsing public API for libs in ${spartacusHomeDir}/temp.`);

const typeList = new Set();

const files = glob.sync(`${spartacusHomeDir}/temp/*.api.json`);
console.log(`Found ${files.length} api.json files.`);
let publicApiData: any[] = [];
files.forEach((file) => {
  publicApiData.push(...parseFile(file));
});
console.log(`publicApiData ${publicApiData.length}`);

console.log(`Type LIST:`);
typeList.forEach((typeee) => {
  console.log(typeee);
});

fs.writeFileSync(
  `${spartacusHomeDir}/public-api.json`,
  JSON.stringify(publicApiData)
);

export function parseFile(filePath: string): any[] {
  console.log(`Read ${filePath}`);
  const inputFileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const entryPoint = inputFileData.members[0];
  console.log(
    `Entry point ${inputFileData.name}, ${entryPoint.members.length} high lvl members`
  );
  return parseElementGroup(entryPoint.members, inputFileData.name);
}

function parseElementGroup(
  members: any[],
  entryPointName: string,
  namespace?: string
) {
  const entryPointElements: any[] = [];

  members.forEach((member: any) => {
    if (member.kind === 'Namespace') {
      entryPointElements.push(
        ...parseElementGroup(member.members, entryPointName, member.name)
      );
    } else {
      entryPointElements.push(parseElement(member, entryPointName, namespace));
    }
  });
  return entryPointElements;
}

function parseElement(
  rawElement: any,
  entryPointName: string,
  namespace?: string
) {
  const parsedElement: any = {};
  parsedElement.entryPoint = unEscapePackageName(entryPointName);
  parsedElement.kind = rawElement.kind;
  parsedElement.name = rawElement.name;
  parsedElement.namespace = namespace;
  if (namespace) {
    console.log(`  ${rawElement.kind}: ${namespace}.${rawElement.name}`);
  } else {
    console.log(`  ${rawElement.kind}: ${rawElement.name}`);
  }
  typeList.add(parsedElement.kind);
  switch (parsedElement.kind) {
    case 'Class':
    case 'Interface': {
      parsedElement.members = parseMembers(rawElement);
      break;
    }
    case 'Variable': {
      parsedElement.type = getParamType(
        rawElement.variableTypeTokenRange,
        rawElement.excerptTokens
      );

      break;
    }
    case 'TypeAlias': {
      parsedElement.members = getTypeAliases(rawElement);
      break;
    }
    case 'Function': {
      parsedElement.parameters = parseMethodParameters(rawElement);
      parsedElement.returnType = getParamType(
        rawElement.returnTypeTokenRange,
        rawElement.excerptTokens
      );
      break;
    }
    case 'Enum': {
      parsedElement.members = getEnumMembers(rawElement);
      break;
    }
    default: {
      throw Error(
        `Unsupported parsing for api element kind ${parsedElement.kind}.`
      );
    }
  }
  return parsedElement;
}

function parseMembers(rawElement: any) {
  const parsedMembers: any[] = [];
  rawElement.members.forEach((rawMember: any) => {
    if (rawMember?.name?.startsWith('ɵ')) return;
    const parsedMember: any = {};
    parsedMember.kind = rawMember.kind;
    parsedMember.name = rawMember.name;
    if (rawMember?.overloadIndex) {
      parsedMember.overloadIndex = rawMember.overloadIndex;
    }
    switch (rawMember.kind) {
      case 'Constructor': {
        parsedMember.name = `constructor`;
        parsedMember.parameters = parseMethodParameters(rawMember);
        break;
      }
      case 'IndexSignature':
      case 'MethodSignature':
      case 'Method': {
        parsedMember.parameters = parseMethodParameters(rawMember);
        parsedMember.returnType = getParamType(
          rawMember.returnTypeTokenRange,
          rawMember.excerptTokens
        );
        break;
      }
      case 'PropertySignature':
      case 'Property': {
        parsedMember.type = getParamType(
          rawMember.propertyTypeTokenRange,
          rawMember.excerptTokens
        );
        break;
      }
      default: {
        throw Error(
          `Unsupported member kind ${rawMember.kind} in ${rawElement.name}`
        );
      }
    }
    parsedMembers.push(parsedMember);
  });
  return parsedMembers;
}

function parseMethodParameters(method: any): any[] {
  const parsedParams: any[] = [];
  method.parameters.forEach((rawParam: any) => {
    const parsedParam: any = {};
    parsedParam.name = rawParam.parameterName;
    parsedParam.type = getParamType(
      rawParam.parameterTypeTokenRange,
      method.excerptTokens
    );
    const typeToken = getTypeReferenceToken(
      rawParam.parameterTypeTokenRange,
      method.excerptTokens
    );
    // This if condition filtters out anonymous types
    // like `payload: { userid: string, cart: Cart }`
    if (parsedParam.type?.startsWith(typeToken.text)) {
      parsedParam.canonicalReference = typeToken.canonicalReference ?? '';
      parsedParam.shortType = typeToken.text ?? '';
    } else {
      parsedParam.canonicalReference = '';
      parsedParam.shortType = '';
    }

    parsedParams.push(parsedParam);
  });
  return parsedParams;
}

function getParamType(tokenRange: any, tokens: any[]): string {
  const startIndex: number = tokenRange.startIndex;
  const endIndex: number = tokenRange.endIndex;
  const paramType = tokens
    .slice(startIndex, endIndex)
    .map((token) => token.text)
    .join('');
  return paramType;
}

function getCanonicalReference(tokenRange: any, tokens: any[]): string {
  const startIndex: number = tokenRange.startIndex;
  const endIndex: number = tokenRange.endIndex;
  return tokens
    .slice(startIndex, endIndex)
    .filter((token) => token.kind === 'Reference')
    .map((token) => token.canonicalReference)
    .join('');
}

function getTypeReferenceToken(tokenRange: any, tokens: any[]): any {
  const startIndex: number = tokenRange.startIndex;
  const endIndex: number = tokenRange.endIndex;
  return (
    tokens
      .slice(startIndex, endIndex)
      .find((token) => token.kind === 'Reference') ?? {}
  );
}

function getTypeAliases(rawElement: any): any {
  return rawElement.excerptTokens
    .slice(
      rawElement.typeTokenRange.startIndex,
      rawElement.typeTokenRange.endIndex
    )
    .map((token: any) => token.text);
}

function getEnumMembers(rawElement: any): any {
  return rawElement.members.map((member: any) => member.name);
}

export function unEscapePackageName(packageName: string) {
  return packageName.replace(/_/g, '/');
}
