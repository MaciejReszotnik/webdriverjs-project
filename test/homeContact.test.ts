import 'chromedriver';
const assert = require('assert');
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { HomePage } from './pageObjects/homePage';
import { ContactPage } from './pageObjects/contactPage';
import 'mocha';
const webdriver = require ('selenium-webdriver'),
    {describe, it, after, before} = require('selenium-webdriver/testing');
const By = webdriver.By;

let driver:WebDriverWrapper;
let homePage: HomePage;
let contactPage: ContactPage;

let expectedEmail = 'hello@qualityminds.de'

// describe('Home page and Contact page tests', function() {
//     this.timeout(1000000);

//     beforeEach(function(){
//         driver = new WebDriverWrapper('chrome');
//         homePage = new HomePage(driver);
//         homePage.navigateToPage();
//     })

//     afterEach(async function (){
//         await driver.quit();
//     })

//     it("'Kontakt aufnehmen' button on the home page contains correct email address", async function(){
//         homePage.acceptCookies();
//         let emailAttribute = await homePage.getEmailAttribute();
//         assert(emailAttribute.trim().includes(expectedEmail));
//     })

//     it("Contact page contains correct email address", async function(){
//         homePage.clickNavElement('Kontakt');
//         contactPage = new ContactPage(driver);
//         let emailAttribute = await contactPage.getEmailAttribute(expectedEmail);
//         assert(emailAttribute.trim().includes(expectedEmail));
//     })

// });
