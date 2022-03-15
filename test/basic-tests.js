'use strict';

require('chromedriver');
const {Builder, By} = require('selenium-webdriver');
const {assert} = require('chai');
const { expect } = require('chai');
const WelcomePage = require("./pages/WelcomePage");
const LogInPage = require("./pages/LogInPage");
const ProfilePage = require("./pages/ProfilePage");
const driver = new Builder().forBrowser('chrome').build();
describe('Simple App', function() {

  let welcomePage
  let logInPage
  let profilePage
  beforeEach(async function(){
    driver.manage().setTimeouts({ implicit: 5000});
    welcomePage = new WelcomePage(driver);
    logInPage = new LogInPage(driver);
    profilePage = new ProfilePage(driver);
  })

  describe('for anonymous user', function () {
    it('home page shows login link', async function () {
      await welcomePage.load();
      expect(await welcomePage.isLogInLinkPresent(),"Login link is not displayed in home page.").to.be.true;
    });

    it('should be directed to login page when login link is clicked', async function () {  
      await welcomePage.load(); 
      await welcomePage.clickLogInLink()
      expect(await logInPage.getTitle(),"User is not directed to login page after clicking the login link.").to.equal("Simple App Login");
    });

    describe('when in login page', function () {
      it('should show username label, password label, input fields, and submit button', async function () {  
        await welcomePage.goToLogIn()
        expect(await logInPage.getTitle(),"User is not directed to login page after clicking the login link.").to.equal("Simple App Login");
        expect(await logInPage.getUsernameLabel(),"Username label is not Username:").to.equal("Username:");
        expect(await logInPage.getPasswordLabel(),"Password label is not Password:").to.equal("Password:");
        expect(await logInPage.isUsernameTextBoxPresent(),"Username text box is not displayed on the login page.").to.be.true;
        expect(await logInPage.isPasswordTextBoxPresent(),"Password text box is not displayed on the login page.").to.be.true;
        expect(await logInPage.isSubmitButtonPresent(),"Submit buttonis not displayed on the login page.").to.be.true;
      });

      it('should not be directed to successful login page when no credentials are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.clickSubmitButton();
        expect(await welcomePage.getTitle(),"User is directed to welcome page using invalid login credentials").to.not.equal("Simple App");
        expect(false,"Error message is not displayed when using incomplete login credentials.").to.be.true;
      });

      it('should not be directed to successful login page when incomplete credentials: missing password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.enterUsername("OnlyUsername");
        await logInPage.clickSubmitButton();
        expect(await welcomePage.getTitle(),"User is directed to welcome page using invalid login credentials").to.not.equal("Simple App");
        expect(false,"Error message is not displayed when using incomplete login credentials.").to.be.true;
      });

      it('should not be directed to successful login page when incomplete credentials: missing username are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.enterPassword("OnlyPassword");
        await logInPage.clickSubmitButton();
        expect(await welcomePage.getTitle(),"User is directed to welcome page using invalid login credentials").to.not.equal("Simple App");
        expect(false,"Error message is not displayed when using incomplete login credentials.").to.be.true;
      });

      xit('should not be directed to successful login page when invalid credentials are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("invalidUsername","invalidPassword")
        expect(await welcomePage.getTitle(),"User is directed to welcome page using invalid login credentials").to.not.equal("Simple App");
      });

      xit('should not be directed to successful login page when valid username and invalid password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jack","invalidPassword")
        expect(await welcomePage.getTitle(),"User is directed to welcome page using invalid login credentials").to.not.equal("Simple App");
      });

    });

  });

  describe('for registered user', function () {
    describe('when in login page', function (done) {
      it('should be directed to successful login page when valid username and password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jack","secret")
        expect(await welcomePage.getTitle(),"User is not directed to welcome page after using valid login credentials.").to.equal("Simple App");
        expect(await welcomePage.isWelcomeMessagePresent(),"Welcome message is not displayed in the successful login welcome page.").to.be.true;
        await welcomePage.logOut();
      });

      it('should be directed to successful login page when valid username and password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jill","birthday")
        expect(await welcomePage.getTitle(),"User is not directed to welcome page after using valid login credentials.").to.equal("Simple App");
        expect(await welcomePage.isWelcomeMessagePresent(),"Welcome message is not displayed in the successful login welcome page.").to.be.true;
        await welcomePage.logOut();
      });

      describe('when successfully logged in', function () {
        it('should show welcome message, profile link, and logout link', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          expect(await welcomePage.isWelcomeMessagePresent(),"Welcome message is not displayed in the successful login welcome page.").to.be.true;  
          expect(await welcomePage.isProfileLinkPresent(),"Profile link is not displayed in successful login welcome page.").to.be.true;
          expect(await welcomePage.isLogOutLinkPresent(),"Logout link is not displayed in successful login welcome page.").to.be.true;
          await welcomePage.logOut();
        });

        it('should be directed to welcome page after clicking logout', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          await welcomePage.clicklogOut()
          expect(await welcomePage.isLogInLinkPresent(),"User is not directed to welcome page after logout.").to.be.true;
        });

        it('should be directed to profile page after clicking profile', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          await welcomePage.goToProfile()
          expect(await profilePage.getTitle(), "User is not directed to profile page after clicking profile link.").to.equal("Your Simple App Profile");
          await profilePage.clickLogOut();
        });

        describe('when in profile page', function () {

          it('should show id label, username label, name label, email label, fields, and logout link.', async function () {  
            await welcomePage.goToLogIn()
            await logInPage.authenticateLogIn("jack","secret")
            await welcomePage.goToProfile()
            expect(await profilePage.getTitle(),"User is not directed to profile page after clicking profile link.").to.equal("Your Simple App Profile");
            expect(await profilePage.getIdLabel(),"Username label is not ID:").to.equal("ID:");
            expect(await profilePage.getUserNameLabel(),"Username label is not Username:").to.equal("Username:");
            expect(await profilePage.getNameLabel(),"Username label is not Name:").to.equal("Name:");
            expect(await profilePage.getEmailLabel(),"Username label is not Email:").to.equal("Email:");
            expect(await profilePage.isIdPresent(),"ID field is not present in profile page.").to.be.true;
            expect(await profilePage.isUserNamePresent(),"Username field is not present in profile page.").to.be.true;
            expect(await profilePage.isNamePresent(),"Name field is not present in profile page.").to.be.true;
            expect(await profilePage.isEmailPresent(),"Email field is not present in profile page.").to.be.true;
            expect(await profilePage.isLogOutLinkPresent(),"Logout link is not present in profile page.").to.be.true;
            await profilePage.clickLogOut();
          });

          it('should show the correct user data for the for the logged in user', async function () {  
            await welcomePage.goToLogIn()
            await logInPage.authenticateLogIn("jack","secret")
            await welcomePage.goToProfile()
            expect(await profilePage.getTitle()).to.equal("Your Simple App Profile");
            expect(await profilePage.getId()).to.equal("1");
            expect(await profilePage.getUserName()).to.equal("jack");
            expect(await profilePage.getName()).to.equal("Jack");
            expect(await profilePage.getEmail()).to.equal("jack@example.com");
            await profilePage.clickLogOut();
          });

          it('should show the correct user data for the for the logged in user', async function () {  
            await welcomePage.goToLogIn()
            await logInPage.authenticateLogIn("jill","birthday")
            await welcomePage.goToProfile()
            expect(await profilePage.getTitle()).to.equal("Your Simple App Profile");
            expect(await profilePage.getId()).to.equal("2");
            expect(await profilePage.getUserName()).to.equal("jill");
            expect(await profilePage.getName()).to.equal("Jill");
            expect(await profilePage.getEmail()).to.equal("jill@example.com");
            await profilePage.clickLogOut();
          });
          
          it('should be directed to welcome page after logout is clicked', async function () {  
            await welcomePage.goToLogIn()
            await logInPage.authenticateLogIn("jack","secret")
            await welcomePage.goToProfile()
            await profilePage.clickLogOut();
            expect(await welcomePage.isLogInLinkPresent(),"User is not directed to welcome page after logout.").to.be.true;
          });

        });
      });
    });
  });

});
