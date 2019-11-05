export enum GroupSkipperType {
  LAYOUT = 'LAYOUT',
  SLOT = 'SLOT',
}

export abstract class GroupSkipperElement {
  type: GroupSkipperType;
  name: string;
  title: string;
}

export abstract class GroupSkipperConfig {
  groupSkipperElements?: GroupSkipperElement[];
}
