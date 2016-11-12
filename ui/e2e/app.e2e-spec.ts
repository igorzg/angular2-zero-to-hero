import { ZeroToHeroPage } from './app.po';

describe('zero-to-hero App', function() {
  let page: ZeroToHeroPage;

  beforeEach(() => {
    page = new ZeroToHeroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
