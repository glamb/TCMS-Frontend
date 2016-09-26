describe('Dashboard', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <tcms-dash>', function () {
    var home = element(by.css('my-app tcms-dash'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Dashboard Works!");
  });

});
