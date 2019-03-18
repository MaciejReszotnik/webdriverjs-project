import 'chromedriver';
import * as assert from "assert";
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { HomePage } from './pageObjects/homePage';
import { WebAutomationPage } from './pageObjects/webAutomationPage';
import 'mocha';
const webdriver = require ('selenium-webdriver'),
    {describe, it, after, before} = require('selenium-webdriver/testing');
const By = webdriver.By;

let driver:WebDriverWrapper;
let homePage: HomePage;
let webAutomationPage: WebAutomationPage;

let expectedEmail = 'hello@qualityminds.de'

describe('Home page and Contact page tests', function() {
    this.timeout(100000);

    before(function () {
        this.timeout(100000);
        driver = new WebDriverWrapper('chrome');
        homePage = new HomePage(driver);
        webAutomationPage = new WebAutomationPage(driver);
        homePage.navigateToPage();
    })

    after(async function (){
        await driver.quit();
    })

    it("'Portfolio' nav link in Web, 'Automation & Mobile Testing' is highlighted", async function(){
        homePage.acceptCookies();
        homePage.navigateViaSubNavElement('Portfolio', 'Web, Automation & Mobile Testing');
        let highlight = await webAutomationPage.getColorFromElement('Portfolio');
        assert(highlight !== 'rgba(0, 0, 0, 1)')
    })

    it("Contact page contains correct email address", async function(){
        webAutomationPage.clickMobileElement();
        
    })

});
