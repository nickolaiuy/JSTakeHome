const BasePage = require('./BasePage')

const USERNAME_LOCATOR = {xpath: "//input[@name = 'username']"};
const USERNAME_LABEL_LOCATOR = {xpath: "//table//tr[1]"};
const PASSWORD_LOCATOR = {xpath: "//input[@name = 'password']"};
const PASSWORD_LABEL_LOCATOR = {xpath: "//table//tr[2]"};
const SUBMIT_BUTTON_LOCATOR = {xpath: "//input[@type = 'submit']"};

class LogInPage extends BasePage{

    constructor(driver)
{
    super(driver);
}

async enterUsername(inputText)
{
    await this.type(USERNAME_LOCATOR, inputText);
}

async isUsernameTextBoxPresent()
{
    return await this.isDisplayed(USERNAME_LOCATOR);
}

async enterPassword(inputText)
{
    await this.type(PASSWORD_LOCATOR, inputText);
}

async isPasswordTextBoxPresent()
{
    return await this.isDisplayed(PASSWORD_LOCATOR);
}

async clickSubmitButton()
{
    await this.click(SUBMIT_BUTTON_LOCATOR);
}

async isSubmitButtonPresent()
{
    return await this.isDisplayed(SUBMIT_BUTTON_LOCATOR);
}

async getUsernameLabel()
{
    return await this.find(USERNAME_LABEL_LOCATOR).getText();
}

async getPasswordLabel()
{
    return await this.find(PASSWORD_LABEL_LOCATOR).getText();
}

async authenticateLogIn(username, password){
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickSubmitButton()
}

}
module.exports = LogInPage
