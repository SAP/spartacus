/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import type { RequestHandler } from 'express';
import { createRobotsTxtHandler } from './robots-txt.handler';
import { DEFAULT_ROBOTS_TXT_CONTENT } from './robots-txt-default-content';

describe('createRobotsTxtHandler', () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {};
    res = {
      set: jest.fn().mockReturnThis(),
      type: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis(),
    };
  });

  describe('when enabled is false', () => {
    it('should return null', () => {
      const handler = createRobotsTxtHandler({ enabled: false });
      expect(handler).toBeNull();
    });
  });

  describe('when no options are provided', () => {
    it('should return a handler', () => {
      const handler = createRobotsTxtHandler();
      expect(handler).not.toBeNull();
    });

    it('should set Cache-Control header', () => {
      const handler = createRobotsTxtHandler() as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.set).toHaveBeenCalledWith(
        'Cache-Control',
        'public, max-age=3600'
      );
    });

    it('should set content type to text/plain', () => {
      const handler = createRobotsTxtHandler() as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.type).toHaveBeenCalledWith('text/plain');
    });

    it('should serve the default content', () => {
      const handler = createRobotsTxtHandler() as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.send).toHaveBeenCalledWith(DEFAULT_ROBOTS_TXT_CONTENT);
    });

    it('should not serve HTML', () => {
      const handler = createRobotsTxtHandler() as RequestHandler;
      handler(req, res, jest.fn());
      const body: string = res.send.mock.calls[0][0];
      expect(body).not.toContain('<!doctype html>');
      expect(body).not.toContain('<app-root>');
    });

    it('default content should contain User-agent directive', () => {
      const handler = createRobotsTxtHandler() as RequestHandler;
      handler(req, res, jest.fn());
      const body: string = res.send.mock.calls[0][0];
      expect(body).toContain('User-agent');
    });
  });

  describe('when custom content is provided', () => {
    const customContent = 'User-agent: *\nDisallow: /private/';

    it('should serve the custom content', () => {
      const handler = createRobotsTxtHandler({
        content: customContent,
      }) as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.send).toHaveBeenCalledWith(customContent);
    });

    it('should still set Cache-Control header', () => {
      const handler = createRobotsTxtHandler({
        content: customContent,
      }) as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.set).toHaveBeenCalledWith(
        'Cache-Control',
        'public, max-age=3600'
      );
    });

    it('should still set content type to text/plain', () => {
      const handler = createRobotsTxtHandler({
        content: customContent,
      }) as RequestHandler;
      handler(req, res, jest.fn());
      expect(res.type).toHaveBeenCalledWith('text/plain');
    });
  });

  describe('when enabled is true explicitly', () => {
    it('should return a handler', () => {
      const handler = createRobotsTxtHandler({ enabled: true });
      expect(handler).not.toBeNull();
    });
  });
});
