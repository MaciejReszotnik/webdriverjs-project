import { By } from "selenium-webdriver";
import { WebDriverWrapper } from "../helpers/webdriverWrapper";
import { NavigationComponent } from "./pageComponents/navigationComponent";

export class BasePage {
    protected webUI: WebDriverWrapper;
    protected navigation: NavigationComponent;

    constructor(webUI: WebDriverWrapper) {
        this.webUI = webUI;
        this.navigation = new NavigationComponent(webUI);
    }

    public navigateViaSubNavElement = (mainNavLink: string, subNavLink: string) => {
        this.navigation.hoverNavElement(mainNavLink);
        this.navigation.clickSubNavElement(subNavLink);
        this.webUI.sleep(5000);
    }

    public scrollToElement = (locator: By) => {
        const element = this.webUI.findElement(locator);
        this.webUI.executeScript("arguments[0].scrollIntoView()", element);
        this.webUI.waitForVisibilityOfElement(500);
    };

}