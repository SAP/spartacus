export abstract class PersonalizationConfig {
  personalization: {
    enabled?: boolean;
    httpHeaderName?: {
      id: string;
      timestamp: string;
    };
    context?: {
      slotId?: string;
      componentId?: string;
    };
  };
}
