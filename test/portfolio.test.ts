import 'chromedriver';
import 'geckodriver';
import 'mocha';
import * as request from 'request';
import * as assert from 'assert';
import * as expectedResult from './data/expectedResults.json';
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { HomePage } from './pageObjects/homePage';
import { WebAutomationPage } from './pageObjects/webAutomationPage.js';

import { NavigationComponent } from './pageObjects/pageComponents/navigationComponent';
import { describe, it, after, before } from 'selenium-webdriver/testing';

let driver: WebDriverWrapper;
let homePage: HomePage;
let webAutomationPage: WebAutomationPage;
let navigation: NavigationComponent;

// Get target browser from passed environment variable
const browserName = process.argv[process.argv.length - 1].split('=').pop();

describe(`Web Automation page tests - ${browserName} tests`, function() {
    this.timeout(100000);

    before(function() {
        this.timeout(100000);
        driver = new WebDriverWrapper(browserName);
        homePage = new HomePage(driver);
        navigation = new NavigationComponent(driver);
        webAutomationPage = new WebAutomationPage(driver);
        homePage.navigateToPage();
    });

    after(async function() {
        await driver.quit();
    });

    it('"Portfolio" nav link in Web, "Automation & Mobile Testing" is highlighted', async function() {
        homePage.acceptCookies();
        if (browserName !== 'firefox') {
            navigation.navigateViaSubNavElement('Portfolio', 'Web, Automation & Mobile Testing');
        } else {
            navigation.navigateViaSubNavElementFirefox('Web, Automation & Mobile Testing');
        }
        const highlight = await navigation.getNavElement('Portfolio').getCssValue('color');
        assert(!highlight.includes(expectedResult.textDefaultColor));
    });

    it('Correct link in pane is clicked', async function() {
        webAutomationPage.clickMobileElement();
        const result: string = await webAutomationPage.getSelectedPaneItem().getText();
        assert(result.toLowerCase() === expectedResult.clickedPaneElement.toLowerCase());
    });

    it('Selected pane link has expected color', async function() {
        const result: string = await webAutomationPage.getSelectedPaneItem().getCssValue('color');
        assert(result.includes(expectedResult.selectedPaneItemColor));
    });

    it('"Flyer Find the Bug Session" button is visible', async function() {
        const result: boolean = await webAutomationPage.getPaneButton('Flyer Find the Bug Session').isDisplayed();
        assert(result);
    });

    it('"Flyer Find the Bug Session" button contains expected link', async function() {
        const result: string = await webAutomationPage.getPaneButton('Flyer Find the Bug Session')
            .getAttribute('href');
        assert(result === expectedResult.linkToPDF);
    });

    it('"Flyer Find the Bug Session" button has working link', async function() {
        request('https://qualityminds.de/app/uploads/2018/11/Find-The-Mobile-Bug-Session.pdf', function(error, response, body) {
            assert(error === null);
            assert(response && response.statusCode === 200);
            assert(body !== null);
        });

    });

});

