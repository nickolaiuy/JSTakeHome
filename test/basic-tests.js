'use strict';

require('chromedriver');
const {Builder, By} = require('selenium-webdriver');
const {assert} = require('chai');
const { expect } = require('chai');
const WelcomePage = require("/webdev/UI_NSX/takehome/Simple-App-Selenium-Mocha-NodeJS/test/pages/WelcomePage");
const LogInPage = require("/webdev/UI_NSX/takehome/Simple-App-Selenium-Mocha-NodeJS/test/pages/LogInPage");
const ProfilePage = require("/webdev/UI_NSX/takehome/Simple-App-Selenium-Mocha-NodeJS/test/pages/ProfilePage");
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
      expect(await welcomePage.isLogInLinkPresent()).to.be.true;
    });

    it('should be directed to login page when login link is clicked', async function () {  
      await welcomePage.load(); 
      await welcomePage.clickLogInLink()
      expect(await logInPage.getTitle()).to.equal("Simple App Login");
    });

    describe('when in login page', function () {
      it('should show username label, password label, input fields, and submit button', async function () {  
        await welcomePage.goToLogIn()
        expect(await logInPage.getTitle()).to.equal("Simple App Login");
        expect(await logInPage.getUsernameLabel()).to.equal("Username:");
        expect(await logInPage.getPasswordLabel()).to.equal("Password:");
        expect(await logInPage.isUsernameTextBoxPresent()).to.be.true;
        expect(await logInPage.isPasswordTextBoxPresent()).to.be.true;
        expect(await logInPage.isSubmitButtonPresent()).to.be.true;
      });

      it('should not be directed to successful login page when no credentials are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.clickSubmitButton();
        expect(await welcomePage.getTitle()).to.equal("Simple App Login");
      });

      xit('should not be directed to successful login page when invalid credentials are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("invalidUsername","invalidPassword")
        expect(await welcomePage.getTitle()).to.equal("Simple App Login");
      });

      xit('should not be directed to successful login page when valid username and invalid password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jack","invalidPassword")
        expect(await welcomePage.getTitle()).to.equal("Simple App Login");
      });

    });

  });

  describe('for registered user', function () {
    describe('when in login page', function (done) {
      it('should be directed to successful login page when valid username and password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jack","secret")
        expect(await welcomePage.getTitle()).to.equal("Simple App");
        expect(await welcomePage.isWelcomeMessagePresent()).to.be.true;
        await welcomePage.logOut();
      });

      it('should be directed to successful login page when valid username and password are provided', async function () {  
        await welcomePage.goToLogIn()
        await logInPage.authenticateLogIn("jill","birthday")
        expect(await welcomePage.getTitle()).to.equal("Simple App");
        expect(await welcomePage.isWelcomeMessagePresent()).to.be.true;
        await welcomePage.logOut();
      });

      describe('when successfully logged in', function () {
        it('should show welcome message, profile link, and logout link', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          expect(await welcomePage.isWelcomeMessagePresent()).to.be.true;  
          expect(await welcomePage.isProfileLinkPresent()).to.be.true;
          expect(await welcomePage.isLogOutLinkPresent()).to.be.true;
          await welcomePage.logOut();
        });

        it('should be directed to welcome page after clicking logout', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          await welcomePage.clicklogOut()
          expect(await welcomePage.isLogInLinkPresent()).to.be.true;
        });

        it('should be directed to profile page after clicking profile', async function () {  
          await welcomePage.goToLogIn()
          await logInPage.authenticateLogIn("jack","secret")
          await welcomePage.goToProfile()
          expect(await profilePage.getTitle()).to.equal("Your Simple App Profile");
          await profilePage.clickLogOut();
        });

        describe('when in profile page', function () {

          it('should show id label, username label, name label, email label, fields, and logout link.', async function () {  
            await welcomePage.goToLogIn()
            await logInPage.authenticateLogIn("jack","secret")
            await welcomePage.goToProfile()
            expect(await profilePage.getTitle()).to.equal("Your Simple App Profile");
            expect(await profilePage.getIdLabel()).to.equal("ID:");
            expect(await profilePage.getUserNameLabel()).to.equal("Username:");
            expect(await profilePage.getNameLabel()).to.equal("Name:");
            expect(await profilePage.getEmailLabel()).to.equal("Email:");
            expect(await profilePage.isIdPresent()).to.be.true;
            expect(await profilePage.isUserNamePresent()).to.be.true;
            expect(await profilePage.isNamePresent()).to.be.true;
            expect(await profilePage.isEmailPresent()).to.be.true;
            expect(await profilePage.isLogOutLinkPresent()).to.be.true;
            await profilePage.clickLogOut();
          });

          it('should show the correct user data for the for the logged in user: Jack', async function () {  
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

          it('should show the correct user data for the for the logged in user: Jill', async function () {  
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
            expect(await welcomePage.isLogInLinkPresent()).to.be.true;
          });

        });
      });
    });
  });

});
