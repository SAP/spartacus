export abstract class ModalConfig {
  modal?: {
    [key: string]: ModalBehaviorConfig;
  };
}

export abstract class ModalBehaviorConfig {
  pageScrollLock?: boolean;
  overlayClickClose?: boolean;
}
