import { By, WebElementPromise } from 'selenium-webdriver';

import { WebDriverWrapper } from '../../helpers/webdriverWrapper';

const Locator = {
    mainNavLink: (linkText: string) =>
        By.xpath(`//ul[@id='top-menu']/li/a[contains(text(),
            \'${linkText}\')]`),
    subNavLink: (linkText: string) => By.xpath(`//ul/li/a[contains(text(), \'${linkText}\')]`),
};

export class NavigationComponent {
    protected webUI: WebDriverWrapper;

    constructor(webUI: WebDriverWrapper) {
        this.webUI = webUI;
    }

    public clickNavElement = (linkText: string): void => {
        this.webUI.waitForVisibilityOfElement(Locator.mainNavLink(linkText), 5000).click();
    }

    public clickSubNavElement = (linkText: string): void => {
        this.webUI.waitForVisibilityOfElement(Locator.subNavLink(linkText)).click();
    }

    public hoverNavElement = (linkText: string): void => {
        const mainNavLink = this.webUI.findElement(Locator.mainNavLink(linkText));
        this.webUI.hover(mainNavLink);
    }

    public navigateViaSubNavElement = (mainNavLink: string, subNavLink: string) => {
        this.hoverNavElement(mainNavLink);
        this.clickSubNavElement(subNavLink);
    }

    public navigateViaSubNavElementFirefox = (subNavLink: string) => {
        this.webUI.executeScript(`
            var orgAttributes = document.querySelector("#menu-item-220").getAttribute("class");
            document.querySelector("#menu-item-220").setAttribute("class", orgAttributes + "et-show-dropdown et-hover");
            `);
        this.clickSubNavElement(subNavLink);
    }

    public getNavElement = (linkText: string): WebElementPromise =>
        this.webUI.waitForVisibilityOfElement(Locator.mainNavLink(linkText))
}
