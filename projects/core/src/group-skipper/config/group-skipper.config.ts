export abstract class GroupSkipperElement {
  type: string;
  id: string;
  title: string;
  enabled: boolean;
  nth?: number;
}

export abstract class GroupSkipperConfig {
  groupSkipper?: GroupSkipperElement[];
}
