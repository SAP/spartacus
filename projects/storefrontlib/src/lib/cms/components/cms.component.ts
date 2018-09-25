export interface CmsComponent {
  onCmsComponentInit(
    uid: string,
    contextParameters?: any,
    loadRequired?: boolean
  );
}
