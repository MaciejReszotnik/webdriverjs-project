import 'chromedriver';
import 'geckodriver';
import * as assert from 'assert';
import {WebDriver, Builder, By, ThenableWebDriver, until, WebElement} from 'selenium-webdriver';

    async function runDriver(driver:ThenableWebDriver):Promise<void> {
        await driver.manage().timeouts().pageLoadTimeout(3000);
        await driver.navigate().to('https://library-app.firebaseapp.com/');
        await driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
        await driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
        await driver.wait(until.elementLocated(By.css(".alert")), 3000);
        await driver.sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
            console.log(result);
        });
        // assert(false);
        
        await driver.close();
    }
['chrome', 'firefox'].forEach((browserName) => {
    const driver:ThenableWebDriver= new Builder().forBrowser(browserName).build();
    runDriver(driver);
})
