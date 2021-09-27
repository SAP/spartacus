import { TestBed } from '@angular/core/testing';
import { FileOptions } from '@spartacus/storefront';
import { FileDownloadService } from './file-download.service';

const fileOptions: FileOptions = {
  fileName: 'data',
  extension: 'csv',
  type: 'text/csv;charset=utf-8;',
};

const fileContent = 'text to save';

describe('FileDownloadService', () => {
  let service: FileDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should download the file', () => {
    const link = document.createElement('a');
    const fakeUrl =
      'blob:http://localhost:9877/50d43852-5f76-41e0-bb36-599d4b99af07';

    spyOn(document, 'createElement').and.returnValue(link);
    spyOn(URL, 'createObjectURL').and.returnValue(fakeUrl);
    spyOn(link, 'setAttribute').and.callThrough();
    spyOn(document.body, 'appendChild').and.callThrough();
    spyOn(link, 'click').and.callThrough();
    spyOn(document.body, 'removeChild').and.callThrough();

    service.download(fileContent, fileOptions);

    expect(document.createElement).toHaveBeenCalledTimes(1);
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    expect(URL.createObjectURL).toHaveBeenCalledWith(
      new Blob(['\ufeff' + fileContent], {
        type: fileOptions.type,
      })
    );
    expect(link.setAttribute).toHaveBeenCalledTimes(2);
    expect(link.setAttribute).toHaveBeenCalledWith('href', fakeUrl);
    expect(link.setAttribute).toHaveBeenCalledWith('download', 'data.csv');
    expect(link.href).toBe(fakeUrl);
    expect(link.target).toBe('');
    expect(link.download).toBe('data.csv');
    expect(document.body.appendChild).toHaveBeenCalledTimes(1);
    expect(document.body.appendChild).toHaveBeenCalledWith(link);
    expect(link.click).toHaveBeenCalledTimes(1);
    expect(link.click).toHaveBeenCalledWith();
    expect(document.body.removeChild).toHaveBeenCalledTimes(1);
    expect(document.body.removeChild).toHaveBeenCalledWith(link);
  });
});
