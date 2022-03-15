const BasePage = require('./BasePage')

const WELCOME_PAGE_LINK = 'http://localhost:3000';
const LOGOUT_LINK = 'http://localhost:3000/logout';
const LOGIN_LINK_LOCATOR = {xpath: '//a[@href]'};
const PROFILE_LINK_LOCATOR = {xpath: "//a[@href='/profile']"};
const LOGOUT_LINK_LOCATOR = {xpath: "//a[@href='/logout']"};
const WELCOME_MESSAGE_LOCATOR = {xpath: "//p"};

class WelcomePage extends BasePage{

constructor(driver)
{
    super(driver);
}

async load()
{
    await this.visit(WELCOME_PAGE_LINK);
}

async logOut()
{
    await this.visit(LOGOUT_LINK);
}

async goToLogIn(){
    await this.load();
    await this.clickLogInLink();
}

async isWelcomeMessagePresent()
{
    return await this.isDisplayed(WELCOME_MESSAGE_LOCATOR);
}

async goToProfile()
{
    await this.click(PROFILE_LINK_LOCATOR);
}

async isProfileLinkPresent()
{
   return await this.isDisplayed(PROFILE_LINK_LOCATOR);
}

async clicklogOut()
{
    await this.click(LOGOUT_LINK_LOCATOR);
}

async isLogOutLinkPresent()
{
    return await this.isDisplayed(LOGOUT_LINK_LOCATOR);
}

async clickLogInLink()
{
    await this.click(LOGIN_LINK_LOCATOR);
}

async isLogInLinkPresent()
{
    return await this.isDisplayed(LOGIN_LINK_LOCATOR);
}

}
module.exports = WelcomePage