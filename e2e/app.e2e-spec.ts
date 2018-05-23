import { AppPage } from './app.po';

describe('get-the-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show search bar', () => {
    page.navigateTo();
    expect(page.getParagraphText).toEqual('Welcome to app!');
  });
});
