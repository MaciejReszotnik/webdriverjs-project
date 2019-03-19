import { BasePage } from "./basePage";
import { By, promise } from "selenium-webdriver";
import { IPage } from "./interfaces/IPage";
import { PageLink } from "../enums/page_links.enum";
import { WebDriverWrapper } from "../helpers/webdriverWrapper";




import { NavigationComponent } from "./pageComponents/navigationComponent";

const Locator = {
    selectionPane: () => By.xpath("//div[@id='team-tab-three-title-desktop']"),
};

export class WebAutomationPage extends BasePage implements IPage  {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.navigation = new NavigationComponent(webUI);
    }

    public getPageLink = (): string => PageLink.ContactPage;

    public navigateToPage = (): void =>
        this.webUI.navigateTo(this.getPageLink())

    public getColorFromElement = async (linkText: string): promise.Promise<string> => 
         await this.navigation.getNavElement(linkText).getCssValue('color');

    public clickMobileElement = (): void => {
        this.webUI.scrollToElement(Locator.selectionPane());
        this.webUI.findElement(Locator.selectionPane()).click();
    }
}