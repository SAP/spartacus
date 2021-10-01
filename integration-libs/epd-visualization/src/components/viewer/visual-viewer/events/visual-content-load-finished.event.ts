export class VisualContentLoadFinishedEvent {
  constructor(
    /**
     * The content created or updated.
     *
     * The content can be of type HTMLImageElement, sap.ui.vk.Scene etc.
     */
    public content: any,
    /**
     * The failure reason if any.<br>
     * An single element or an array of elements with the following structure:
     * <ul>
     *   <li>error - An object with details of the error.
     *   <li>contentResource - A {@link sap.ui.vk.ContentResource sap.ui.vk.ContentResource} object when it is possible to
     *       match the Error object to a {@link sap.ui.vk.ContentResource sap.ui.vk.ContentResource} object.
     * </ul>
     */
    public failureReason: any
  ) {}
}
