import { CmsComponent } from "@spartacus/core";

export interface GigyaRaasComponentData extends CmsComponent {
    uid?: string;
    name?: string;
    container?: string;
    screenSet?: string;
    profileEdit?: string;
    showAnonymous?: boolean;
    embed?: string;
    startScreen?: string;
    showLoggedIn?: boolean;
    containerID?: string;
    linkText?: string;
    advancedConfiguration?: string;
  }
  