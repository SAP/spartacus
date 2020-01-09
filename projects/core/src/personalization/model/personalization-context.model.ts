export interface PersonalizationAction {
  customization_name: string;
  customization_code: string;
  variation_name: string;
  variation_code: string;
  action_name: string;
  action_code: string;
}

export interface PersonalizationContext {
  actions: PersonalizationAction[];
  segments: string[];
}
