export interface FileOptions {
  /**
   * File name for exported file.
   */
  fileName: string;
  /**
   * Extension for exported file.
   */
  extension: string;
  /**
   * Mime/type for exported file.
   */
  type: string;
}

export interface InvalidFileInfo {
  tooLarge?: { maxSize: number };
  tooManyEntries?: { maxEntries: number };
  empty?: boolean;
  notParsable?: boolean;
}
