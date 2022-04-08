import deepEqual from 'deep-equal';
import * as fs from 'fs';
import { getElementCategory, getSignatureDoc, printStats } from './common';

// --------------------------------------------------
// Main Logic
// --------------------------------------------------
const oldApiFile = process.argv[2];
const newApiFile = process.argv[3];

const newApiData = JSON.parse(fs.readFileSync(newApiFile, 'utf-8'));
const oldApiData = JSON.parse(fs.readFileSync(oldApiFile, 'utf-8'));

console.log(`Comparing public API between:`);
console.log(`old: ${oldApiFile}, ${oldApiData.length} entries`);
console.log(`new: ${newApiFile}, ${newApiData.length} entries`);

const breakingChanges: any[] = [];
oldApiData.forEach((oldApiElement: any) => {
  const newApiElementMatch = findElementInApi(newApiData, oldApiElement);
  if (newApiElementMatch) {
    // compare elements for more possible differences
    const elementBreakingChanges = compareElements(
      oldApiElement,
      newApiElementMatch
    );
    if (elementBreakingChanges?.length > 0) {
      addBreakingChanges(oldApiElement, elementBreakingChanges);
      breakingChanges.push(oldApiElement);
    }
  } else {
    // Old Element is not in new api
    // Was it moved?
    const newApiElementMoved = findMovedElementInApi(newApiData, oldApiElement);
    if (newApiElementMoved) {
      // element was moved
      oldApiElement.isMoved = true;
      oldApiElement.newName = '';
      oldApiElement.newEntryPoint = newApiElementMoved.entryPoint;
      (oldApiElement.newNamespace = newApiElementMoved.namespace ?? ''),
        addBreakingChanges(oldApiElement, [
          {
            ...getChangeDesc(oldApiElement, 'MOVED'),
            to: {
              entryPoint: newApiElementMoved.entryPoint,
              namespace: newApiElementMoved.namespace ?? '',
            },
          },
        ]);
      const elementBreakingChanges = compareElements(
        oldApiElement,
        newApiElementMoved
      );
      if (elementBreakingChanges?.length > 0) {
        addBreakingChanges(oldApiElement, elementBreakingChanges);
      }
    } else {
      // it is removed
      oldApiElement.isDeleted = true;
      oldApiElement.deletedComment = `${oldApiElement.kind} ${
        oldApiElement.namespace ? oldApiElement.namespace + '.' : ''
      }${
        oldApiElement.name
      } has been removed and is no longer part of the public API.`;
      oldApiElement.migrationComment = '';
      addBreakingChanges(oldApiElement, [
        {
          ...getChangeDesc(oldApiElement, 'DELETED'),
        },
      ]);
    }
    breakingChanges.push(oldApiElement);
  }
});

printStats(breakingChanges);

fs.writeFileSync(`data/breaking-changes.json`, JSON.stringify(breakingChanges));

// --------------------------------------------------
// Functions
// --------------------------------------------------

function findElementInApi(apiData: Array<any>, elementToFind: any): any {
  return apiData.find((apiDataElement) => {
    return (
      apiDataElement.name === elementToFind.name &&
      apiDataElement.kind === elementToFind.kind &&
      apiDataElement.entryPoint === elementToFind.entryPoint &&
      apiDataElement.namespace === elementToFind.namespace
    );
  });
}

function findMovedElementInApi(apiData: Array<any>, elementToFind: any): any {
  return apiData.find((apiDataElement) => {
    return (
      apiDataElement.name === elementToFind.name &&
      apiDataElement.kind === elementToFind.kind &&
      // This logic could be case by case.
      // With cart-lib epic,  we have multiple classes that
      // moved to both entry points and namespace
      // However, we don't want to have false moves with
      // the model interfaces that have no namespace, but
      // all have a counterpart in the 'Occ' namespace.
      (elementToFind.namespace
        ? true
        : apiDataElement.namespace === elementToFind.namespace)
    );
  });
}

function compareElements(oldElement: any, newElement: any): any[] {
  switch (oldElement.kind) {
    case 'Interface':
    case 'Class': {
      return getMembersBreakingChange(oldElement, newElement);
    }
    case 'Enum': {
      return getEnumBreakingChange(oldElement, newElement);
    }
    case 'TypeAlias': {
      return getTypeAliasBreakingChange(oldElement, newElement);
    }
    case 'Variable': {
      return getVariableBreakingChange(oldElement, newElement);
    }
    case 'Function': {
      return getFunctionBreakingChange(oldElement, newElement);
    }
    case 'Namespace': {
      return [];
    }
    default: {
      throw Error(`Compare unsupported for element kind ${oldElement.kind}.`);
    }
  }
}

function getVariableBreakingChange(oldElement: any, newElement: any): any[] {
  if (oldElement.type !== newElement.type) {
    return [
      {
        ...getChangeDesc(oldElement, 'CHANGED'),
        oldType: oldElement.type,
        newType: newElement.type,
        previousStateDoc: `${oldElement.name}: ${oldElement.type}`,
        currentStateDoc: `${newElement.name}: ${newElement.type}`,
      },
    ];
  } else {
    return [];
  }
}

function getTypeAliasBreakingChange(oldElement: any, newElement: any): any[] {
  if (!deepEqual(oldElement.members, newElement.members)) {
    return [
      {
        ...getChangeDesc(oldElement, 'CHANGED'),
        previousStateDoc: oldElement.members.join(',\n'),
        currentStateDoc: newElement.members.join(',\n'),
        new: newElement.members,
      },
    ];
  } else {
    return [];
  }
}
function getFunctionBreakingChange(oldElement: any, newElement: any): any[] {
  const paramBreakingChanges = getParametersBreakingChange(
    oldElement,
    newElement
  );
  const returnTypeChanged = oldElement.returnType !== newElement.returnType;
  if (paramBreakingChanges.length > 0 || returnTypeChanged) {
    const oldElementCopy = { ...oldElement };
    delete oldElementCopy.breakingChanges; // avoid circular references
    const newElementCopy = { ...newElement };
    delete newElementCopy.breakingChanges; // avoid circular references

    return [
      {
        ...getChangeDesc(oldElement, 'CHANGED'),
        previousStateDoc: getSignatureDoc(oldElement),
        currentStateDoc: getSignatureDoc(newElement),
        oldElement: oldElementCopy,
        newElement: newElementCopy,
      },
    ];
  } else {
    return [];
  }
}

function getMembersBreakingChange(
  oldApiElement: any,
  newApiElementMatch: any
): any[] {
  const breakingChanges = [];
  oldApiElement.members.forEach((oldMember: any) => {
    let newMember = findMatchingMember(newApiElementMatch, oldMember);
    if (!newMember && oldMember.kind === 'Constructor') {
      newMember = getConstructorIfUnique(newApiElementMatch);
    }
    if (!newMember) {
      breakingChanges.push({
        ...getChangeDesc(oldMember, 'DELETED'),
        isDeletedMember: true,
        deletedMember: oldMember,
        apiElementName: oldApiElement.name,
        apiElementKind: oldApiElement.kind,
        entryPoint: oldApiElement.entryPoint,
        deletedComment: `// TODO:Spartacus - ${oldMember.kind} '${oldMember.name}' was removed from ${oldApiElement.kind} '${oldApiElement.name}'.`,
        migrationComment: '',
      });
    } else {
      breakingChanges.push(...getMemberBreakingChange(oldMember, newMember));
    }
  });
  return breakingChanges;
}

function getConstructorIfUnique(newApiElement: any): any {
  const constructors = newApiElement.members.filter(
    (member: any) => member.kind === 'Constructor'
  );
  if (constructors?.length === 1) {
    return constructors[0];
  } else {
    return undefined;
  }
}

function getMemberBreakingChange(oldMember: any, newMember: any): any[] {
  switch (oldMember.kind) {
    case 'Constructor': {
      return getParametersBreakingChange(oldMember, newMember);
    }
    case 'IndexSignature':
    case 'MethodSignature':
    case 'Method': {
      return getFunctionBreakingChange(oldMember, newMember);
    }
    case 'PropertySignature':
    case 'Property': {
      return getVariableBreakingChange(oldMember, newMember);
    }
    default: {
      throw Error(
        `Unsupported member kind for compare ${oldMember.kind} in ${oldMember.name}`
      );
    }
  }
}

function getParametersBreakingChange(oldMember: any, newMember: any): any[] {
  if (!oldMember?.parameters && !newMember?.parameters) {
    return [];
  }
  const parametersHaveBreakingChange = isParametersBreakingChangeDetected(
    oldMember.parameters,
    newMember.parameters
  );
  if (parametersHaveBreakingChange) {
    const removedParams: any[] = paramDiff(oldMember, newMember);
    const addedParams: any[] = paramDiff(newMember, oldMember);

    return [
      {
        ...getChangeDesc(oldMember, 'CHANGED'),
        previousStateDoc: getSignatureDoc(oldMember),
        currentStateDoc: getSignatureDoc(newMember),
        details: {
          kind: oldMember.kind,
          name: oldMember.name,
          oldParams: oldMember.parameters,
          newParams: newMember.parameters,
          removedParams,
          addedParams,
        },
      },
    ];
  } else {
    return [];
  }
}

function isParametersBreakingChangeDetected(
  oldParameters: any[],
  newParameters: any[]
): boolean {
  // Removed params is a breaking change
  if (oldParameters.length > newParameters.length) {
    return true;
  }
  // Were parameter(s) added?
  // If they are not optional, it's a breaking change
  if (oldParameters.length < newParameters.length) {
    const extraParams = newParameters.slice(oldParameters.length);
    if (!extraParams.every((param: any) => param.isOptional)) {
      return true;
    }
  }
  // Detect changes in the existing parameters.
  for (let index = 0; index < oldParameters.length; index++) {
    if (!isSameTypeParameter(oldParameters[index], newParameters[index])) {
      return true;
    }
  }
  return false;
}

function paramDiff(oldMember: any, newMember: any): any[] {
  return oldMember.parameters.filter(
    (oldParameter: any) =>
      !newMember.parameters.find((newParameter: any) =>
        isIdenticalParams(oldParameter, newParameter)
      )
  );
}

function isIdenticalParams(oldParam: any, newParam: any) {
  return oldParam.name === newParam?.name && oldParam.type === newParam?.type;
}

function isSameTypeParameter(oldParam: any, newParam: any) {
  return oldParam.type === newParam?.type;
}

function addBreakingChanges(element: any, breakingChanges: any[]) {
  if (!breakingChanges) {
    return;
  }
  if (breakingChanges.length === 0) {
    return;
  }
  if (!element.breakingChanges) {
    element.breakingChanges = [];
  }
  breakingChanges = addBreakingChangeContext(element, breakingChanges);
  element.breakingChanges.push(...breakingChanges);
}

function addBreakingChangeContext(apiElement: any, breakingChanges: any[]) {
  return breakingChanges.map((breakingChange: any) => {
    breakingChange.topLevelApiElementName = apiElement.name;
    breakingChange.entryPoint = apiElement.entryPoint;
    return breakingChange;
  });
}

function findMatchingMember(newApiElement: any, oldMember: any) {
  return newApiElement.members.find(
    (member: any) =>
      member.name === oldMember.name &&
      member.kind === oldMember.kind &&
      member?.overloadIndex === oldMember?.overloadIndex
  );
}

function getEnumBreakingChange(oldElement: any, newElement: any): any[] {
  if (isEnumValueRemoved(oldElement.members, newElement.members)) {
    return [
      {
        ...getChangeDesc(oldElement, 'CHANGED'),
        previousStateDoc: oldElement.members.join(',\n'),
        currentStateDoc: newElement.members.join(',\n'),
        old: oldElement.members,
        new: newElement.members,
      },
    ];
  } else {
    return [];
  }
}

function isEnumValueRemoved(oldMembers: any[], newMembers: any[]): boolean {
  return !oldMembers.every((oldMember: any) => {
    return newMembers.some((newMember: any) => newMember === oldMember);
  });
}

function getChangeName(elementKind: string, changeType: string) {
  return `${elementKind.toUpperCase()}_${changeType}`;
}

function getChangeDesc(element: any, changeType: string): any {
  return {
    change: getChangeName(element.kind, changeType),
    changeType,
    changeKind: element.kind,
    changeLabel: getChangeLabel(changeType),
    changeElementName: element.name,
    changeElementCategory: getElementCategory(element),
  };
}

function getChangeLabel(changeType: string): string {
  let label = changeType.toLowerCase();
  return label.replace(/_/g, ' ');
}
