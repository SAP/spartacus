import { getLogMessages } from '../utils/log.utils';

expect.extend({
  toContainLogs(received: string[], expected: string[]) {
    const receivedString = received.join('\n');
    const expectedString = Array.isArray(expected)
      ? expected.join('\n')
      : expected;
    const pass = receivedString.includes(expectedString);
    if (pass) {
      return {
        message: () =>
          `Expected log messages not to contain:\n${expectedString}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Expected log messages to contain:\n${expectedString}\n\nbut received:\n${receivedString}`,
        pass: false,
      };
    }
  },
});

interface CustomMatchers<R = unknown> {
  toContainLogs(expected: string[] | string): R;
}

declare global {
  namespace jest {
    interface Expect extends CustomMatchers {}
    interface Matchers<R> extends CustomMatchers<R> {}
    interface InverseAsymmetricMatchers extends CustomMatchers {}
  }
}

/**
 * Return a jest matcher that can be used to check log messages.
 * @returns The jest matcher.
 */
export function expectLogMessages(): jest.JestMatchers<string[]> {
  return expect(getLogMessages());
}
