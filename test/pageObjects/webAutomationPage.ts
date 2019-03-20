import { By, WebElementPromise } from 'selenium-webdriver';

import { BasePage } from './basePage';
import { PageLink } from '../enums/page_links.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';
import { NavigationComponent } from './pageComponents/navigationComponent';

const Locator = {
    paneActiveButton: (btnText: string) => By.xpath(`//div[@id='team-tab-three-body']//div[contains(@class, 'tab-download-button')]//a[text()=\'${btnText}\']`),
    paneMobile: () => By.xpath('//div[@id="team-tab-three-title-desktop"]'),
    paneSelectedItem: () => By.xpath('//*[contains(@class,"active-team-tab") and not(contains(@class, "inactive-team-tab"))]'),
};

export class WebAutomationPage extends BasePage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.navigation = new NavigationComponent(webUI);
        this.url = PageLink.WebAutomationPage;
    }

    public clickMobileElement = (): void => {
        this.webUI.scrollToElement(Locator.paneMobile()).click();
    }

    public getSelectedPaneItem = (): WebElementPromise =>
        this.webUI.findElement(Locator.paneSelectedItem())

    public getPaneButton = (btnText: string): WebElementPromise =>
        this.webUI.waitForVisibilityOfElement(Locator.paneActiveButton(btnText))
}
