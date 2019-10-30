export abstract class GroupSkipperComponentConfig {
  enabled: boolean;
  title?: string;
  nth?: number;
}

export abstract class GroupSkipperSlotConfig {
  groupSkipper?: {
    slots: GroupSkipperSlot[];
  };
}

export abstract class GroupSkipperSlot {
  slot: string;
  enabled: boolean;
  title?: string;
}
