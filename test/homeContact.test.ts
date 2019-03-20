import 'chromedriver';
import 'geckodriver';
import 'mocha';
import * as assert from 'assert';
import * as browsers from './data/browserNames.json';
import * as expectedResult from './data/expectedResults.json';
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { HomePage } from './pageObjects/homePage';
import { ContactPage } from './pageObjects/contactPage';

import { NavigationComponent } from './pageObjects/pageComponents/navigationComponent';
import {describe, it, after, before} from 'selenium-webdriver/testing';

let driver: WebDriverWrapper;
let homePage: HomePage;
let contactPage: ContactPage;
let navigation: NavigationComponent;

browsers.browserNames.forEach((browserName) => {
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
});
