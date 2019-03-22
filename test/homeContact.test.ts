import 'chromedriver';
import 'geckodriver';
import 'mocha';
import * as assert from 'assert';
import * as expectedResult from './data/expectedResults.json';
import { describe, it, after, before } from 'selenium-webdriver/testing';
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { ContactPage } from './pageObjects/contactPage';
import { HomePage } from './pageObjects/homePage';
import { NavigationComponent } from './pageObjects/pageComponents/navigationComponent';

// Get target browser from environment variable

const browserName = process.env.NODE_browser;
let driver: WebDriverWrapper;
let homePage: HomePage;
let contactPage: ContactPage;
let navigation: NavigationComponent;

describe(`Home page and Contact page tests - ${browserName} tests`, function() {
    this.timeout(1000000);

    before(function() {
        driver = new WebDriverWrapper(browserName);
        homePage = new HomePage(driver);
        navigation = new NavigationComponent(driver);
        homePage.navigateToPage();
    });

    after(async function() {
        await driver.quit();
    });

    it('"Kontakt aufnehmen" button on the home page contains correct email address', async function() {
        homePage.acceptCookies();
        const emailAttribute = await homePage.getEmailAttribute();
        assert(emailAttribute.trim().includes(expectedResult.companyEmail));
    });

    it('Contact page contains correct email address', async function() {
        navigation.clickNavElement('Kontakt');
        contactPage = new ContactPage(driver);
        const emailAttribute = await contactPage.getEmailAttribute(expectedResult.companyEmail);
        assert(emailAttribute.trim().includes(expectedResult.companyEmail));
    });
});

