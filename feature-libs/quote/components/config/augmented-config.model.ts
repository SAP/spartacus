import { QuoteUIConfig } from './quote-ui.config';

declare module '@spartacus/quote/root' {
  interface Config extends QuoteUIConfig {}
}
