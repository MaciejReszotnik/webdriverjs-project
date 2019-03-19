import 'chromedriver';
import 'iedriver';
import * as assert from 'assert';
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { HomePage } from './pageObjects/homePage';
import { ContactPage } from './pageObjects/contactPage';
import 'mocha';
import { NavigationComponent } from './pageObjects/pageComponents/navigationComponent';
import {describe, it, after, before} from 'selenium-webdriver/testing';

let driver:WebDriverWrapper;
let homePage: HomePage;
let contactPage: ContactPage;
let navigation: NavigationComponent;

let expectedEmail = 'hello@qualityminds.de'
let browsers = ['ie', 'chrome'];


browsers.forEach((browser) => { 
describe('Home page and Contact page tests', function() {
    this.timeout(1000000);

    before(function(){
        driver = new WebDriverWrapper(browser);
        homePage = new HomePage(driver);
        navigation = new NavigationComponent(driver);
        homePage.navigateToPage();
    })

    after(async function (){
        await driver.quit();
    });

    it("'Kontakt aufnehmen' button on the home page contains correct email address", async function(){
        homePage.acceptCookies();
        let emailAttribute = await homePage.getEmailAttribute();
        assert(emailAttribute.trim().includes(expectedEmail));
    })

    it("Contact page contains correct email address", async function(){
        navigation.clickNavElement('Kontakt');
        contactPage = new ContactPage(driver);
        let emailAttribute = await contactPage.getEmailAttribute(expectedEmail);
        assert(emailAttribute.trim().includes(expectedEmail));
    })
});

});
