import { interceptGet } from '../../../support/utils/intercept';

describe('Segment Reference', () => {
  beforeEach(() => {
    cy.restoreLocalStorage();
  });
  it('should fetch appropriate banner customization', () => {
    interceptGet('segmentRefApi', '/cms/pages*');
    cy.visit('/?segmentrefs=footwear');
    cy.wait('@segmentRefApi').then((xhr) => {
      expect(xhr.request.headers).to.have.property('segmentrefs', 'footwear');
    });
  });
});
