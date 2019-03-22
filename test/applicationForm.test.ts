import 'chromedriver';
import 'geckodriver';
import 'mocha';
import * as assert from 'assert';
import * as path from 'path';
import * as expectedResult from './data/expectedResults.json';
import { describe, it, after, before } from 'selenium-webdriver/testing';
import { ApplicationFormPage } from './pageObjects/applicationFormPage.js';
import { CareerPage } from './pageObjects/careerPage.js';
import { HomePage } from './pageObjects/homePage';
import { NavigationComponent } from './pageObjects/pageComponents/navigationComponent';
import { TextFieldType } from './enums/textFieldTypes.enum.js';
import { WebDriverWrapper } from './helpers/webdriverWrapper';

let applicationFormPage: ApplicationFormPage;
let careerPage: CareerPage;
let driver: WebDriverWrapper;
let homePage: HomePage;
let navigation: NavigationComponent;

// Get target browser from environment variable
const browserName = process.argv[process.argv.length - 1].split('=').pop();

describe(`Filling in application form tests - ${browserName} tests`, function() {
    this.timeout(1000000);

    before(function() {
        driver = new WebDriverWrapper(browserName);
        homePage = new HomePage(driver);
        careerPage = new CareerPage(driver);
        applicationFormPage = new ApplicationFormPage(driver);
        navigation = new NavigationComponent(driver);
        homePage.navigateToPage();
        homePage.acceptCookies();
    });

    after(async function() {
        await driver.quit();
    });

    it('"Contact" page has been opened', async function() {
        navigation.clickNavElement('Karriere');
        const careerPageUrl = await applicationFormPage.getCurrentPageUrl();
        assert(careerPageUrl === expectedResult.contactPageUrl);
    });

    it('"Career" page has been opened', async function() {
        careerPage.clickContactButton();
        const applicationFormPageUrl = await applicationFormPage.getCurrentPageUrl();
        assert(applicationFormPageUrl === expectedResult.applicationFormPageUrl);
    });

    it('Empty application form cannot be sent', async function() {
        await applicationFormPage.clickSubmitButton();
        assert((await applicationFormPage.getErrorMessages()).length > 0);
        const applicationFormPageUrl = await applicationFormPage.getCurrentPageUrl();
        assert(applicationFormPageUrl === expectedResult.applicationFormPageUrl);
        const isSubmitted = await applicationFormPage.isFormPresent();
        assert(isSubmitted);
    });

    it('Empty application form generates expected error message on submition', async function() {
        const errorMessage = await (await applicationFormPage.getErrorMessages())[0].getText();
        assert(errorMessage === expectedResult.applicationFormError);
    });

    it('Application form with first name filled in generates expected error message on submition', async function() {
        applicationFormPage.refreshPage();
        applicationFormPage.fillInTextFiled('FirstName', TextFieldType.FirstName);
        await applicationFormPage.clickSubmitButton();
        const errorMessage = await (await applicationFormPage.getErrorMessages())[0].getText();
        assert(errorMessage === expectedResult.applicationFormError);
    });

    it('File can be attached to form', async function() {
        applicationFormPage.refreshPage();
        const filePath = path.join(__dirname, '../files/', 'upload.jpg');
        await applicationFormPage.uploadFile(filePath);
    });

    it('Form can be submitted', async function() {
        await applicationFormPage.refreshPage();
        await applicationFormPage.fillInWholeForm();
        await applicationFormPage.clickSubmitButton();
        const isSubmitted = await applicationFormPage.isFormSubmitted();
        assert(isSubmitted);
    });
});

