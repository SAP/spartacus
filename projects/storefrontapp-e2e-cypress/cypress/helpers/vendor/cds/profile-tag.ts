export const profileTagHelper = {
  interceptProfileTagJs(contentWindow) {
    const oldAppendChild = contentWindow.document.head.appendChild;
    contentWindow.document.head.appendChild = function (newChild) {
      if (
        newChild &&
        (<HTMLScriptElement>(<any>newChild)).src &&
        (<HTMLScriptElement>(<any>newChild)).src.indexOf('profile-tag') !== -1
      ) {
        return newChild;
      }
      return oldAppendChild.call(this, newChild);
    };
  },
  profileTagScriptResponse: {},
};

export function verifyNumberOfEventsInDataLayer(
  eventName: string,
  numberOfEvents: number
) {
  cy.window().then((win) => {
    console.log('event layer contents: ', (<any>win).Y_TRACKING.eventLayer);
    expect(
      (<any>win).Y_TRACKING.eventLayer.filter(
        (event) => event.name === eventName
      ).length
    ).to.equal(numberOfEvents);
  });
}
