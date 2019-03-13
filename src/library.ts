import 'chromedriver';
import {WebDriver, Builder, By, ThenableWebDriver, until, WebElement} from 'selenium-webdriver';

    var drive = new Builder().forBrowser('chrome').build();

    async function runDriver(driver:ThenableWebDriver) {
        await driver.manage().timeouts().pageLoadTimeout(3000);
        // await driver.manage().timeouts().implicitlyWait(1000);
        await driver.navigate().to('https://library-app.firebaseapp.com/');
        await driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
        await driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
        await driver.wait(until.elementLocated(By.css(".alert")), 3000);
        let doupa = driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
            console.log(result);
        });
        await driver.close();
        await driver.quit();
    }

    runDriver(drive);