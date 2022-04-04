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
