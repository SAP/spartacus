import { CmsComponent } from '@spartacus/core';

export interface GigyaRaasComponentData extends CmsComponent {
  uid?: string; // Unique identifier of the Component
  name?: string; // Name of the Component
  screenSet?: string; // Name of the Screen set which is to be displayed
  profileEdit?: string; // Determines if screen is for profile edit
  embed?: string; // Display screen in embed way
  startScreen?: string; // Starting screen which will be displayed on rendering the screen set
  containerID?: string; // Container name in which CDC screen will be displayed
  linkText?: string; // Text of the button for the screen set when rendered in pop-up way
  advancedConfiguration?: string; // Advanced configuration for the screen set
}
