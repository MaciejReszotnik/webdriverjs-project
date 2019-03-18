import 'chromedriver';
import 'selenium-webdriver';
import { Builder, until, ThenableWebDriver, By } from 'selenium-webdriver';

export class WebDriverWrapper {

    driver:ThenableWebDriver;

    constructor(driverName:string) {
        this.driver =  new Builder().forBrowser(driverName).build();
    }

    navigateTo(url:string) {
        this.driver.navigate().to(url.toString());
    }

    findElement = (locator: By) => {
        return this.driver.findElement(locator);
    }

    waitUntil = (condition:any, timeout:number) => {
        return this.driver.wait(condition, timeout);
    }

    waitForElement = (locator:By, timeout=2000) => {
        this.waitUntil(until.elementLocated(locator), timeout);
        return this.findElement(locator);
    }

    waitForVisibilityOfElement = (locator:By, timeout=2000) => {
        this.waitUntil(until.elementIsVisible(this.findElement(locator)), timeout);
    }

    sleep = (timeout:number) => {
        this.driver.sleep(timeout);
    }
    quit = () => {
        this.driver.quit();
    }
}