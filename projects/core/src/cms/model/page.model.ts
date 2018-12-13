export interface Page {
  pageId?: string;
  name?: string;
  template?: string;
  loadTime?: number;
  seen?: Array<string>;
  slots: { [key: string]: any };
}
