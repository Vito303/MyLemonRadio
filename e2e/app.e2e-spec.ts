import { MyLemonAppPage } from './app.po';

describe('my-lemon-app App', () => {
  let page: MyLemonAppPage;

  beforeEach(() => {
    page = new MyLemonAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
