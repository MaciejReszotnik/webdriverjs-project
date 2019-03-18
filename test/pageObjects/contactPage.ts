import { WebDriverWrapper } from "../helpers/webdriverWrapper";
import { PageLink } from "../enums/page_links.enum";
import { By, promise } from "selenium-webdriver";
import { BasePage } from "./basePage";
import { IPage } from "./interfaces/IPage"

const Locator = {
    sendEmailLink: (expectedText:string) => By.linkText(expectedText),
}

export class ContactPage extends BasePage implements IPage {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
    }

    public getPageLink = (): string => PageLink.ContactPage;

    public navigateToPage = (): void => {
        this.webUI.navigateTo(this.getPageLink());
    }

    public getEmailAttribute = (text:string): promise.Promise<string> => {
        return this.webUI.waitForVisibilityOfElement(Locator.sendEmailLink(text), 3000).getAttribute('href');
    }
}