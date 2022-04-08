export function printStats(breakingChangeElements: any[]) {
  console.log(
    `${breakingChangeElements.length} api elements with breaking changes`
  );

  const globalBreakingChangeList = breakingChangeElements
    .map((element) => element.breakingChanges)
    .flat();
  console.log(`${globalBreakingChangeList.length} individual breaking changes`);

  printStatsForBreakingChangeList(globalBreakingChangeList);
}

export function printStatsForBreakingChangeList(
  globalBreakingChangeList: any
): void {
  const groupByCategory = globalBreakingChangeList.reduce((group, element) => {
    const { change } = element;
    group[change] = group[change] ?? [];
    group[change].push(element);
    return group;
  }, {});
  Object.keys(groupByCategory)
    .sort()
    .forEach((key) => {
      console.log(`${key}: ${groupByCategory[key].length}`);
    });
}

export function isMember(kind: string): boolean {
  const memberKinds = [
    'Constructor',
    'IndexSignature',
    'MethodSignature',
    'Method',
    'PropertySignature',
    'Property',
  ];
  return memberKinds.includes(kind);
}

export function isTopLevelApi(kind: string): boolean {
  const apiKinds = [
    'Namespace',
    'Interface',
    'Class',
    'Enum',
    'TypeAlias',
    'Variable',
    'Function',
  ];
  return apiKinds.includes(kind);
}

export function unEscapePackageName(packageName: string) {
  return packageName.replace(/_/g, '/');
}

export function escapePackageName(packageName: string) {
  return packageName.replace(/\//g, '_').replace(/\_/, '/');
}

export function getSignatureDoc(
  functonElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  const parameterDoc = getParameterDoc(functonElement, multiLine);
  let doc = `${lineEnding}${functonElement.name}(${parameterDoc})${
    functonElement.returnType ? ': ' + functonElement.returnType : ''
  }${lineEnding}`;

  return doc;
}

export function getParameterDoc(
  functonElement: any,
  multiLine: boolean = true
): string {
  const lineEnding = getLineEnding(multiLine);
  if (functonElement.parameters?.length) {
    let parameterDoc = lineEnding;
    functonElement.parameters.forEach((parameter: any, index: number) => {
      parameterDoc += `  ${parameter.name}: ${parameter.type}${
        index + 1 >= functonElement.parameters.length ? '' : ','
      }${lineEnding}`;
    });
    return parameterDoc;
  } else {
    return '';
  }
}

function getLineEnding(multiLine: boolean = true) {
  return multiLine ? '\n' : '';
}

export function getElementCategory(apiElement: any): string {
  if (isTopLevelApi(apiElement.kind)) {
    return 'TOP_LEVEL_API';
  }
  if (isMember(apiElement.kind)) {
    return 'MEMBER';
  }
  throw new Error(
    `Unknown api element category for element "${apiElement.name}" with kind ${apiElement.kind}}`
  );
}
