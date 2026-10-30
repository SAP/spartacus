/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { of } from 'rxjs';
import { CustomPageTemplate } from '../../model/page.model';
import { CmsPageTemplateConnector } from './cms-page-template.connector';

const mockTemplate: CustomPageTemplate = {
  id: 'testTemplate',
  name: 'Test Template',
  origin: 'CUSTOM',
};

describe('CmsPageTemplateConnector', () => {
  let connector: CmsPageTemplateConnector;
  let adapter: { load: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    adapter = {
      load: vi.fn().mockReturnValue(of(mockTemplate)),
    };
    connector = new CmsPageTemplateConnector(adapter as any);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });

  describe('get', () => {
    it('should call adapter.load with the given templateId', () => {
      connector.get('testTemplate').subscribe();
      expect(adapter.load).toHaveBeenCalledWith('testTemplate');
    });

    it('should return the Observable from the adapter', () => {
      let result: CustomPageTemplate | undefined;
      connector.get('testTemplate').subscribe((res) => (result = res));
      expect(result).toEqual(mockTemplate);
    });
  });
});
