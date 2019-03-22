import { By, promise } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { PageLink } from '../enums/page_links.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';


const Locator = {
    cookiesBtn: () => By.xpath('//*[@aria-label="allow cookies"]'),
    sendEmailBtn: () => By.xpath('//a[contains(text(), "Kontakt aufnehmen")]'),
};

export class HomePage extends BasePage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.url = PageLink.HomePage;
    }

    public acceptCookies = (): promise.Promise<void> =>
        this.webUI.waitForVisibilityOfElement(Locator.cookiesBtn()).click()

    public getEmailAttribute = (): promise.Promise<string> =>
        this.webUI.findElement(Locator.sendEmailBtn()).getAttribute('href')
}
