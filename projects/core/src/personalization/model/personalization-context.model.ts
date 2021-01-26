/**
 * @deprecated since 3.2, use personalization lib instead
 */
export interface PersonalizationAction {
  action_name: string;
  action_type: string;
  customization_name?: string;
  customization_code?: string;
  variation_name?: string;
  variation_code?: string;
}

/**
 * @deprecated since 3.2, use personalization lib instead
 */
export interface PersonalizationContext {
  actions: PersonalizationAction[];
  segments: string[];
}
