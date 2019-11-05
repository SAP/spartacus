export enum GroupSkipperType {
  LAYOUT = 'LAYOUT',
  SLOT = 'SLOT',
}

export abstract class GroupSkipperElement {
  type: GroupSkipperType;
  name: string;
  title: string;
  enabled? = true;
}

export abstract class GroupSkipperConfig {
  groupSkipperElements?: GroupSkipperElement[];
}
