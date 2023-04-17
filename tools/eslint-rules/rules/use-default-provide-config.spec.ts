import { TSESLint } from '@typescript-eslint/utils';
import { rule, RULE_NAME } from './use-default-provide-config';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`provideConfig(spartacusConfig)`],
  invalid: [],
});
