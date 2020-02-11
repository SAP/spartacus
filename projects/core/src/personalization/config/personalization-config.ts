export abstract class PersonalizationConfig {
  personalization: {
    enabled?: boolean;
    httpHeaderName?: {
      id: string;
      timestamp: string;
    };
    context?: {
      slotPosition?: string;
      componentId?: string;
    };
  };
}
