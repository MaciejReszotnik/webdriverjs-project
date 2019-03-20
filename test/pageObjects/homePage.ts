import { WebDriverWrapper } from '../helpers/webdriverWrapper';
import { PageLink } from '../enums/page_links.enum';
import { By } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { IPage } from './interfaces/IPage';

const Locator = {
    cookiesBtn: () => By.xpath('//*[@aria-label="allow cookies"]'),
    sendEmailBtn: () => By.xpath('//a[contains(text(), "Kontakt aufnehmen")]'),
};

export class HomePage extends BasePage implements IPage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
    }

    public getPageLink = (): string => PageLink.HomePage;

    public navigateToPage = (): void => {
        this.webUI.navigateTo(this.getPageLink());
    }

    public acceptCookies = (): void => {
        this.webUI.waitForVisibilityOfElement(Locator.cookiesBtn()).click();
    }

    public getEmailAttribute() {
        return this.webUI.findElement(Locator.sendEmailBtn()).getAttribute('href');
    }
}
