/**
 * Utility function to benchmark a test suite using events emmitted by the Cypress test runner
 *
 * To benchmark your test, just import and call this function before the test suite runs.
 */
export function benchmark() {
  const commands = [];

  Cypress.on('test:after:run', (attributes) => {
    /* eslint-disable no-console */
    console.log(
      'Test "%s" has finished in %dms',
      attributes.title,
      attributes.duration
    );
    console.table(commands);
    commands.length = 0;
  });

  Cypress.on('command:start', (c) => {
    commands.push({
      name: c.attributes.name,
      startedAt: +new Date(),
    });
  });

  Cypress.on('command:end', (c) => {
    const lastCommand = commands[commands.length - 1];

    if (lastCommand.name !== c.attributes.name) {
      throw new Error('Last command errored out');
    }

    lastCommand.endedAt = +new Date();
    lastCommand.elapsed = (lastCommand.endedAt - lastCommand.startedAt) / 1000;
  });
}
