import {webdriver, By, until} from 'selenium-webdriver';
// var webdriver = require('selenium-webdriver'),
//     By = webdriver.By,
//     until = webdriver.until;

    var drive = new webdriver.Builder().forBrowser('chrome').build();

    async function runDriver(driver:any) {
        await driver.get('http://google.com');
        await driver.sleep(3000);
        await driver.close();
        await driver.quit();
    }

    runDriver(drive);