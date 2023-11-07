/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { TestBed } from '@angular/core/testing';
import { MediaSourcesPipe } from './media-sources.pipe';

const mockImgUrl = 'https://test.url/image';
const mockSrcset = `${mockImgUrl} 96w, ${mockImgUrl} 284w`;

describe('MediaSourcesPipe', () => {
  let pipe: MediaSourcesPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MediaSourcesPipe],
    });

    pipe = TestBed.inject(MediaSourcesPipe);
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the srcset string into an array of sources with widths', () => {
    const result = pipe.transform(mockSrcset);

    expect(result.length).toBe(2);
    expect(result[0].srcset).toBe(mockImgUrl);
    expect(result[0].media).toBe('(min-width: 284px)');
    expect(result[1].srcset).toBe(mockImgUrl);
    expect(result[1].media).toBe('(min-width: 96px)');
  });

  it('should handle srcset with missing widths', () => {
    const srcset = `${mockImgUrl}, ${mockImgUrl} 284w`;

    const result = pipe.transform(srcset);

    expect(result.length).toBe(1);
    expect(result[0].srcset).toBe(mockImgUrl);
    expect(result[0].media).toBe('(min-width: 284px)');
  });

  it('should handle srcset with missing URLs', () => {
    const srcset = `96w, ${mockImgUrl} 284w`;

    const result = pipe.transform(srcset);
    console.log(result);

    expect(result.length).toBe(1);
    expect(result[0].srcset).toBe(mockImgUrl);
    expect(result[0].media).toBe('(min-width: 284px)');
  });
});
