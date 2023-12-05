import * as i0 from "@angular/core";
export declare class FileDownloadService {
    /**
     * Triggers the browser downloading of the file from the given URL.
     *
     * @param {string} url URL to file.
     * @param {string} [fileName] The optional parameter for defining filename
     * (including the extension) when saving the file.
     */
    download(url: string, fileName?: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FileDownloadService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FileDownloadService>;
}
