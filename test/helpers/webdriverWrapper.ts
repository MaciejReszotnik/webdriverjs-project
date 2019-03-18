import 'chromedriver';
import 'selenium-webdriver';
import { Builder, until, ThenableWebDriver, By, Window, IWebElement, WebElementPromise } from 'selenium-webdriver';

export class WebDriverWrapper {

    driver:ThenableWebDriver;

    constructor(driverName:string, pageLoadTimeout: number = 25000) {
        this.driver =  new Builder().forBrowser(driverName).build();
        this.driver.manage().timeouts().pageLoadTimeout(pageLoadTimeout);
        this.driver.manage().window().maximize();
    }

    navigateTo(url:string) {
        this.driver.navigate().to(url.toString());
    }

    findElement = (locator: By) => {
        return this.driver.findElement(locator);
    }

    public scrollToElement = (locator: By) => {
        let element = this.waitForElement(locator);
        this.driver.executeScript("arguments[0].scrollIntoView()", element);
        this.driver.sleep(300);
    };

    waitUntil = (condition:any, timeout:number) => {
        return this.driver.wait(condition, timeout);
    }

    waitForElement = (locator:By, timeout=2000) => {
        this.waitUntil(until.elementLocated(locator), timeout);
        return this.findElement(locator);
    }

    waitForVisibilityOfElement = (locator:By, timeout=2000) => {
        this.waitUntil(until.elementIsVisible(this.findElement(locator)), timeout);
        return this.findElement(locator);
    }

    executeScript = (passedFunction:string|Function, element:WebElementPromise) => {
        this.driver.executeScript(passedFunction, element);
    }

    hover = (element: WebElementPromise) => {
        this.driver.actions().mouseMove(element).perform();
    }

    sleep = (timeout:number) => {
        this.driver.sleep(timeout);
    }
    quit = () => {
        this.driver.quit();
    }
}