import 'chromedriver';
import 'selenium-webdriver';
import { Builder, until } from 'selenium-webdriver';

export class WebDriverWrapper {
    constructor(driverName) {
        this.driver =  new Builder().forBrowser(driverName).build();
    }

    navigateTo(url) {
        this.driver.navigate().to(url.toString());
    }

    findElement = (locator) => {
        return this.driver.findElement(locator);
    }

    waitUntil = (condition, timeout) => {
        return this.driver.wait(condition, timeout);
    }

    waitForElement = (locator, timeout=2000) => {
        this.waitUntil(until.elementLocated(locator), timeout);
        return this.findElement(locator);
    }

    waitForVisibilityOfElement = (locator, timeout=2000) => {
        this.waitUntil(until.elementIsVisible(findElement(locator), timeout))
    }

    sleep = (timeout) => {
        this.driver.sleep(timeout);
    }
    quit = () => {
        this.driver.quit();
    }
}