/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { firstValueFrom, of, Subject } from 'rxjs';
import { CustomPageTemplate, CustomSection } from '../model/page.model';
import { PageTemplateService } from './page-template.service';

const mockSections: CustomSection[] = [
  { name: 'header', sectionItems: [] },
  { name: 'footer', sectionItems: [] },
];

const mockTemplate: CustomPageTemplate = {
  id: 'testTemplate',
  name: 'Test Template',
  shellTemplate: 'ShellComponent',
  sections: mockSections,
  origin: 'CUSTOM',
};

describe('PageTemplateService', () => {
  let service: PageTemplateService;
  let connector: { get: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    connector = {
      get: vi.fn().mockReturnValue(of(mockTemplate)),
    };
    service = new PageTemplateService(connector as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPageTemplate', () => {
    it('should call connector.get with the given templateId', async () => {
      await firstValueFrom(service.getPageTemplate('testTemplate'));
      expect(connector.get).toHaveBeenCalledWith('testTemplate');
    });

    it('should return the template from the connector', async () => {
      const result = await firstValueFrom(service.getPageTemplate('testTemplate'));
      expect(result).toEqual(mockTemplate);
    });

    it('should cache the result and not call connector again for the same templateId', async () => {
      await firstValueFrom(service.getPageTemplate('testTemplate'));
      await firstValueFrom(service.getPageTemplate('testTemplate'));
      expect(connector.get).toHaveBeenCalledTimes(1);
    });

    it('should call connector separately for different templateIds', async () => {
      connector.get.mockReturnValueOnce(of(mockTemplate)).mockReturnValueOnce(of({ ...mockTemplate, id: 'other' }));
      await firstValueFrom(service.getPageTemplate('testTemplate'));
      await firstValueFrom(service.getPageTemplate('other'));
      expect(connector.get).toHaveBeenCalledTimes(2);
      expect(connector.get).toHaveBeenCalledWith('testTemplate');
      expect(connector.get).toHaveBeenCalledWith('other');
    });

    it('should replay the last value to new subscribers', async () => {
      const subject = new Subject<CustomPageTemplate>();
      connector.get.mockReturnValue(subject.asObservable());

      const results: CustomPageTemplate[] = [];
      service.getPageTemplate('testTemplate').subscribe((v) => results.push(v));
      subject.next(mockTemplate);

      // second subscriber after value emitted — shareReplay should replay
      await firstValueFrom(service.getPageTemplate('testTemplate'));
      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(connector.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPageTemplateSections', () => {
    it('should return sections from the template', async () => {
      const result = await firstValueFrom(service.getPageTemplateSections('testTemplate'));
      expect(result).toEqual(mockSections);
    });

    it('should return empty array when template has no sections', async () => {
      connector.get.mockReturnValue(of({ ...mockTemplate, sections: undefined }));
      service = new PageTemplateService(connector as any);
      const result = await firstValueFrom(service.getPageTemplateSections('testTemplate'));
      expect(result).toEqual([]);
    });
  });

  describe('getShellTemplate', () => {
    it('should return shellTemplate from the template', async () => {
      const result = await firstValueFrom(service.getShellTemplate('testTemplate'));
      expect(result).toBe('ShellComponent');
    });

    it('should return empty string when template has no shellTemplate', async () => {
      connector.get.mockReturnValue(of({ ...mockTemplate, shellTemplate: undefined }));
      service = new PageTemplateService(connector as any);
      const result = await firstValueFrom(service.getShellTemplate('testTemplate'));
      expect(result).toBe('');
    });
  });
});
