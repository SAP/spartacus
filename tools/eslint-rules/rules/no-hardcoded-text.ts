/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ESLintUtils } from '@typescript-eslint/utils';
import { ensureTemplateParser } from '@angular-eslint/utils';

export const RULE_NAME = 'no-hardcoded-text';

/**
 * Attributes whose literal (non-bound) values are user-facing and therefore
 * must be translated. Mirrors the `-a alt,title,placeholder,aria-label` flag of
 * the legacy `i18n-lint` CLI this rule replaces.
 */
const TRANSLATABLE_ATTRIBUTES = new Set([
  'alt',
  'title',
  'placeholder',
  'aria-label',
]);

/**
 * Elements whose text content the legacy `i18n-lint` CLI skipped
 * (`ignoreTags` default). Text inside these is not user-facing copy, so it is
 * not flagged. Kept for strict parity with the old tool.
 */
const IGNORED_TAGS = new Set(['script', 'style', 'pre', 'code']);

/**
 * Determines whether a string is a hardcoded (untranslated) user-facing string.
 *
 * Ported verbatim from the legacy `i18n-lint` tool (`lib/utils.js`,
 * `isHardcodedString`) so this rule flags exactly what the old CLI flagged -
 * no more, no less. The only behavioural difference versus the old tool is that
 * this rule runs on the real Angular template AST (via
 * `@angular-eslint/template-parser`), which natively understands the `@if`/
 * `@for`/`@switch` control-flow blocks and interpolations - so it no longer
 * produces false positives on migrated control-flow templates.
 */
function isHardcodedString(value: string): boolean {
  const str = value ? value.trim() : '';
  if (!str) {
    return false;
  }
  // Single, all lowercase words with no single dots.
  if (/^([a-z!?]|[ ]){2,}?(?:[.]{2,})?$/.test(str)) {
    return true;
  }
  // Probably a hardcoded string if it contains a capital letter, or lowercase
  // letters followed by a space.
  return /([A-Z])/.test(str) || /[a-z](?=[ ])/.test(str);
}

/**
 * Normalizes a text node's content the way the legacy CLI's `ontext` handler
 * did before classification: trim, strip a single leading/trailing parenthesis,
 * then trim again. Replicated verbatim so text-node verdicts match exactly.
 * Note: the old CLI applied this to text nodes only - attribute values were
 * passed to `isHardcodedString` unchanged - so this is NOT used for attributes.
 */
function normalizeTextNode(value: string): string {
  return (value ? value.trim() : '').replace(/^[()]|[()]$/g, '').trim();
}

/**
 * ESLint template rule that flags hardcoded (untranslated) user-facing text in
 * Angular HTML templates - both literal text nodes and the literal values of
 * the `alt`, `title`, `placeholder` and `aria-label` attributes. Text rendered
 * through bindings/interpolation (e.g. `{{ x | cxTranslate }}`) is a
 * `BoundText`/`BoundAttribute` node and is therefore never visited.
 *
 * Replaces the unmaintained standalone `i18n-lint@1.1.0` CLI, which could not
 * parse Angular control-flow syntax.
 */
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Disallow hardcoded (untranslated) user-facing text in templates; use the cxTranslate pipe instead',
    },
    schema: [],
    messages: {
      hardcodedText:
        'Hardcoded text "{{ text }}" found. User-facing text must be translated (use the cxTranslate pipe).',
      hardcodedAttribute:
        'Hardcoded text "{{ text }}" found in attribute "{{ attribute }}". User-facing text must be translated (use the cxTranslate pipe).',
    },
  },
  defaultOptions: [],
  create(context) {
    ensureTemplateParser(context);

    // Only lint external `.html` component templates - the scope the legacy
    // `i18n-lint` CLI covered. Inline templates are linted via
    // `processInlineTemplates`, which gives them a virtual
    // `inline-template-*.component.html` filename; skip those, as they are
    // overwhelmingly test mocks and were never scanned before.
    const filename = context.filename ?? context.getFilename?.() ?? '';
    if (!filename.endsWith('.html') || filename.includes('inline-template-')) {
      return {};
    }

    return {
      Text(node: { value: string; parent?: { type?: string; name?: string } }) {
        // Skip text inside non-copy elements (script/style/pre/code), matching
        // the legacy CLI's `ignoreTags`.
        const parent = node.parent;
        if (
          parent &&
          typeof parent.name === 'string' &&
          IGNORED_TAGS.has(parent.name)
        ) {
          return;
        }
        if (isHardcodedString(normalizeTextNode(node.value))) {
          context.report({
            node: node as never,
            messageId: 'hardcodedText',
            data: { text: node.value.trim() },
          });
        }
      },
      'Element > TextAttribute'(node: { name: string; value: string }) {
        if (
          TRANSLATABLE_ATTRIBUTES.has(node.name) &&
          isHardcodedString(node.value)
        ) {
          context.report({
            node: node as never,
            messageId: 'hardcodedAttribute',
            data: { attribute: node.name, text: node.value.trim() },
          });
        }
      },
    };
  },
});
