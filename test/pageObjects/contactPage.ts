import { By, promise } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { PageLink } from '../enums/page_links.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';

const Locator = {
    sendEmailLink: (expectedText: string) => By.linkText(expectedText),
};

export class ContactPage extends BasePage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.url = PageLink.ContactPage;
    }

    public getEmailAttribute = (text: string): promise.Promise<string> => {
        return this.webUI.waitForVisibilityOfElement(Locator.sendEmailLink(text), 3000).getAttribute('href');
    }
}
