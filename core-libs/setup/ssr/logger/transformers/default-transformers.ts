import { DefaultTraceparentTransformer } from './traceparent/default-traceparent-transformer';

export interface TransformerConfig {}

export const defaultTransformersConfig: TransformerConfig = {
  traceparentTransformer: new DefaultTraceparentTransformer(),
};
