import 'chromedriver';
import 'selenium-webdriver';
import * as chromeSettings from 'selenium-webdriver/chrome';
import * as firefoxSettings from 'selenium-webdriver/firefox';
import { Builder, By, ThenableWebDriver, until, WebElementCondition, WebElementPromise } from 'selenium-webdriver';

export class WebDriverWrapper {

    protected driver: ThenableWebDriver;

    constructor(driverName: string, pageLoadTimeout: number = 25000) {
        if (driverName === 'chrome') {
            const chromeOptions = new chromeSettings.Options();
            chromeOptions.addArguments('--disable-extensions-file-access-check',
                 '--disable-extensions', '--disable-notifications', '--disable-notifications');
            chromeOptions.setUserPreferences({'download.default_directory' : '../downloads'});
            this.driver = new Builder().forBrowser(driverName).setChromeOptions(chromeOptions).build();
        } else {
            this.driver = new Builder().forBrowser(driverName).build();
        }
        this.driver.manage().timeouts().pageLoadTimeout(pageLoadTimeout);
        this.driver.manage().window().maximize();
    }

    public navigateTo(url: string) {
        this.driver.navigate().to(url.toString());
    }

    public findElement = (locator: By) => {
        return this.driver.findElement(locator);
    }

    public scrollToElement = (locator: By) => {
        const element = this.waitForElement(locator);
        this.driver.executeScript('arguments[0].scrollIntoView()', element);
        this.driver.sleep(300);
    }

    public waitUntil = (condition: WebElementCondition, timeout: number) => {
        return this.driver.wait(condition, timeout);
    }

    public waitForElement = (locator: By, timeout = 2000) => {
        this.waitUntil(until.elementLocated(locator), timeout);
        return this.findElement(locator);
    }

    public waitForVisibilityOfElement = (locator: By, timeout = 2000) => {
        this.waitUntil(until.elementIsVisible(this.findElement(locator)), timeout);
        return this.findElement(locator);
    }

    public isElementVisible = async (locator: By, timeout = 0): Promise<boolean> =>
        await this.waitForElement(locator, timeout).isDisplayed()

    public executeScript = (passedFunction: string|Function, element?: WebElementPromise) => {
        this.driver.executeScript(passedFunction, element);
    }

    public hover = (element: WebElementPromise): void => {
        this.driver.actions().mouseMove(element).perform();
    }

    public sleep = (timeout: number): void => {
        this.driver.sleep(timeout);
    }
    public quit = (): void => {
        this.driver.quit();
    }
}
