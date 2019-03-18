import { WebDriverWrapper } from "../helpers/webdriverWrapper";
import { PageLink } from "../enums/page_links.enum";
import { By, promise, WebElementPromise } from "selenium-webdriver";
import { IPage } from "./interfaces/IPage";
import { BasePage } from "./basePage";
import { NavigationComponent } from "./pageComponents/navigationComponent";

const Locator = {
    selectionPane: () => By.xpath("//div[@id='team-tab-three-title-desktop']"),
}

export class WebAutomationPage extends BasePage implements IPage  {

    constructor(webUI: WebDriverWrapper) {
        super(webUI);
        this.navigation = new NavigationComponent(webUI);
    }

    public getPageLink = (): string => PageLink.ContactPage;

    public navigateToPage = (): void => {
        this.webUI.navigateTo(this.getPageLink());
    }

    public getColorFromElement = async (linkText: string) => {
        let nav = await this.navigation.getNavElement(linkText).getCssValue('color');
        console.log(nav);
        this.webUI.sleep(5000);
        return nav;
    }

    public clickMobileElement = () => {
        this.webUI.scrollToElement(Locator.selectionPane());
        this.webUI.findElement(Locator.selectionPane()).click();
    }
}