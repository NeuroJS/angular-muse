import { AngularMusePage } from './app.po';

describe('angular-muse App', () => {
  let page: AngularMusePage;

  beforeEach(() => {
    page = new AngularMusePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
