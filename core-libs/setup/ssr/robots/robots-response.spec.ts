/** @jest-environment node */

/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { type Response } from 'express';
import { sendRobotsTxtResponse } from '@spartacus/setup/ssr';

function createResponse(): Response {
  const response = {
    send: jest.fn(),
    setHeader: jest.fn(),
    statusCode: 418,
  } as Partial<Response>;
  response.status = jest.fn((statusCode: number) => {
    response.statusCode = statusCode;
    return response;
  }) as unknown as Response['status'];
  return response as Response;
}

describe('sendRobotsTxtResponse', () => {
  it('sends the example robots.txt with a successful plain text response', () => {
    const response = createResponse();

    sendRobotsTxtResponse(response);

    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    expect(response.send).toHaveBeenCalledWith(
      '# SAP Spartacus example robots.txt.\n' +
        "# Adapt paths to your storefront's routing and URL prefixes.\n" +
        '# This example permits all crawlers, including AI crawlers, on other paths.\n' +
        '\n' +
        'User-agent: *\n' +
        '\n' +
        '# Cart: the page, its subpaths, and URLs with query parameters.\n' +
        'Disallow: /cart$\n' +
        'Disallow: /cart/\n' +
        'Disallow: /cart?\n' +
        '\n' +
        '# Cart under a base-site prefix.\n' +
        'Disallow: /*/cart$\n' +
        'Disallow: /*/cart/\n' +
        'Disallow: /*/cart?\n' +
        '\n' +
        '# Checkout.\n' +
        'Disallow: /checkout$\n' +
        'Disallow: /checkout/\n' +
        'Disallow: /checkout?\n' +
        '\n' +
        '# Customer account.\n' +
        'Disallow: /my-account$\n' +
        'Disallow: /my-account/\n' +
        'Disallow: /my-account?\n' +
        '\n' +
        '# All customer-account pages under a base-site prefix.\n' +
        'Disallow: /*/my-account$\n' +
        'Disallow: /*/my-account/\n' +
        'Disallow: /*/my-account?\n'
    );
  });

  it('sends supplied robots.txt content verbatim', () => {
    const response = createResponse();
    const content = 'User-agent: ExampleBot\nDisallow: /private\n';

    sendRobotsTxtResponse(response, content);

    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    expect(response.send).toHaveBeenCalledWith(content);
  });

  it('sends an explicitly empty override without restoring the example', () => {
    const response = createResponse();

    sendRobotsTxtResponse(response, '');

    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith(
      'Content-Type',
      'text/plain; charset=utf-8'
    );
    expect(response.send).toHaveBeenCalledWith('');
  });
});
