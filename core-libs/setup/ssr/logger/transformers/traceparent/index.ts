import { ExpressLogTransformer } from '../express-log-transformer';
import { TraceparentTransformer } from './traceparent-transformer';

declare module '../default-transformers' {
  interface TransformerConfig {
    traceparentTransformer?: TraceparentTransformer;
    anyTransformer?: ExpressLogTransformer;
  }
}

export * from './default-traceparent-transformer';
export * from './traceparent-transformer';
