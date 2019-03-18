import { WebDriverWrapper } from "../helpers/webdriverWrapper";
import { By } from "selenium-webdriver";
import { NavigationComponent } from "./pageComponents/navigationComponent";

// const Locator = {
//     mainNavLink: (linkText:string) => 
//         By.xpath(`//ul[@id='top-menu']/li/a[contains(text(),
//             \'${linkText}\')]`),
//     subNavLink: (linkText:string) => By.xpath(`//ul/li/a[contains(text(), \'${linkText}\')]`),
//     sendEmailBtn: () => By.xpath("//a[contains(text(), 'Kontakt aufnehmen')]"),
//     cookiesBtn: () => By.xpath("//*[@aria-label='allow cookies']")
// }

export class BasePage {
    protected webUI:WebDriverWrapper;
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
        let element = this.webUI.findElement(locator);
        this.webUI.executeScript("arguments[0].scrollIntoView()", element);
        this.webUI.sleep(300);
    };

    Locator = {
        mainNavLink: (linkText:string) => 
            By.xpath(`//ul[@id='top-menu']/li/a[contains(text(),
                \'${linkText}\')]`),
        subNavLink: (linkText:string) => By.xpath(`//ul/li/a[contains(text(), \'${linkText}\')]`),
        sendEmailBtn: () => By.xpath("//a[contains(text(), 'Kontakt aufnehmen')]"),
        cookiesBtn: () => By.xpath("//*[@aria-label='allow cookies']")
    }
}