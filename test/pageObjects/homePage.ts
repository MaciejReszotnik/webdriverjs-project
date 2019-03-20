import { By } from 'selenium-webdriver';

import { WebDriverWrapper } from '../helpers/webdriverWrapper';
import { PageLink } from '../enums/page_links.enum';
import { BasePage } from './basePage';

const Locator = {
    cookiesBtn: () => By.xpath('//*[@aria-label="allow cookies"]'),
    sendEmailBtn: () => By.xpath('//a[contains(text(), "Kontakt aufnehmen")]'),
};

export class HomePage extends BasePage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.url = PageLink.HomePage;
    }

    public acceptCookies = (): void => {
        this.webUI.waitForVisibilityOfElement(Locator.cookiesBtn()).click();
    }

    public getEmailAttribute() {
        return this.webUI.findElement(Locator.sendEmailBtn()).getAttribute('href');
    }
}
