import { WebDriverWrapper } from "../helpers/webdriverWrapper";
import { PageLink } from "../enums/page_links.enum";
import { By } from "selenium-webdriver";
import { NavigationComponent } from "./pageComponents/navigationComponent";
import { BasePage } from "./basePage";
import { IPage } from "./interfaces/IPage";

const Locator = {
    mainNavLink: (linkText:string) => 
        By.xpath(`//ul[@id='top-menu']/li/a[contains(text(),
            \'${linkText}\')]`),
    subNavLink: (linkText:string) => By.xpath(`//ul/li/a[contains(text(), \'${linkText}\')]`),
    sendEmailBtn: () => By.xpath("//a[contains(text(), 'Kontakt aufnehmen')]"),
    cookiesBtn: () => By.xpath("//*[@aria-label='allow cookies']")
}

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

    // public clickNavElement = (linkText:string):void => {
    //     this.webUI.waitForVisibilityOfElement(Locator.mainNavLink(linkText),5000).click();
    // }

    // public clickSubNavElement = (linkText:string):void => {
    //     this.webUI.waitForVisibilityOfElement(Locator.subNavLink(linkText)).click();
    // }

    // public hoverNavElement = (linkText:string): void => {
    //     let mainNavLink = this.webUI.findElement(Locator.mainNavLink(linkText));
    //     this.webUI.hover(mainNavLink);
    // }

    public getEmailAttribute() {
        return this.webUI.findElement(Locator.sendEmailBtn()).getAttribute('href');
    }

}