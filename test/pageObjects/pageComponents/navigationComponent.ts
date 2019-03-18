import { WebDriverWrapper } from "../../helpers/webdriverWrapper";
import { By, WebElementPromise } from "selenium-webdriver";

const Locator = {
    mainNavLink: (linkText:string) => 
        By.xpath(`//ul[@id='top-menu']/li/a[contains(text(),
            \'${linkText}\')]`),
    subNavLink: (linkText:string) => By.xpath(`//ul/li/a[contains(text(), \'${linkText}\')]`),
}

export class NavigationComponent {
    webUI:WebDriverWrapper;
    
    constructor(webUI: WebDriverWrapper) {
        this.webUI = webUI;
    }

    public clickNavElement = (linkText:string): void => {
        this.webUI.waitForVisibilityOfElement(Locator.mainNavLink(linkText),5000).click();
    }

    public clickSubNavElement = (linkText:string): void => {
        this.webUI.waitForVisibilityOfElement(Locator.subNavLink(linkText)).click();
    }

    public hoverNavElement = (linkText:string): void => {
        let mainNavLink = this.webUI.findElement(Locator.mainNavLink(linkText));
        this.webUI.hover(mainNavLink);
    }

    public getNavElement = (linkText:string): WebElementPromise => 
        this.webUI.waitForVisibilityOfElement(Locator.mainNavLink(linkText));

}