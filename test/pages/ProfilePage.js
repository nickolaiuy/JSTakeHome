const BasePage = require('./BasePage')

const ID_LOCATOR = {xpath: "//table//tr[1]/td"};
const ID_LABEL_LOCATOR = {xpath: "//table//tr[1]/th"};
const USERNAME_LOCATOR = {xpath: "//table//tr[2]/td"};
const USERNAME_LABEL_LOCATOR = {xpath: "//table//tr[2]/th"};
const NAME_LOCATOR = {xpath: "//table//tr[3]/td"};
const NAME_LABEL_LOCATOR = {xpath: "//table//tr[3]/th"};
const EMAIL_LOCATOR = {xpath: "//table//tr[4]/td"};
const EMAIL_LABEL_LOCATOR = {xpath: "//table//tr[4]/th"};
const LOGOUT_LINK_LOCATOR = {xpath: "//a[@href='/logout']"};

class ProfilePage extends BasePage{

    constructor(driver)
    {
        super(driver);
    }

    async getId()
    {
        return await this.find(ID_LOCATOR).getText();
    }

    async getIdLabel()
    {
        return await this.find(ID_LABEL_LOCATOR).getText();
    }

    async isIdPresent()
    {
        return await this.isDisplayed(ID_LOCATOR);
    }

    async getUserName()
    {
        return await this.find(USERNAME_LOCATOR).getText();
    }

    async getUserNameLabel()
    {
        return await this.find(USERNAME_LABEL_LOCATOR).getText();
    }

    async isUserNamePresent()
    {
        return await this.isDisplayed(USERNAME_LOCATOR);
    }

    async getName()
    {
        return await this.find(NAME_LOCATOR).getText();
    }

    async getNameLabel()
    {
        return await this.find(NAME_LABEL_LOCATOR).getText();
    }

    async isNamePresent()
    {
        return await this.isDisplayed(NAME_LOCATOR);
    }

    async getEmail()
    {
        return await this.find(EMAIL_LOCATOR).getText();
    }

    async getEmailLabel()
    {
        return await this.find(EMAIL_LABEL_LOCATOR).getText();
    }

    async isEmailPresent()
    {
        return await this.isDisplayed(EMAIL_LOCATOR);
    }

    async isLogOutLinkPresent()
    {
        return await this.isDisplayed(LOGOUT_LINK_LOCATOR);
    }

    async clickLogOut()
    {
        await this.click(LOGOUT_LINK_LOCATOR);
    }


}
module.exports = ProfilePage
