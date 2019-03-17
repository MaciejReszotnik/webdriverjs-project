require('chromedriver');
require('mocha');
// require('chai');
const webdriver = require ('selenium-webdriver'),
    {describe, it, after, before} = require('selenium-webdriver/testing');
        By = webdriver.By;
        until = webdriver.until;

let driver;

describe('Start testing', function() {
    this.timeout(1000000);

before(function(){
    
})

beforeEach(function(){
    driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.navigate().to('https://library-app.firebaseapp.com/');
})

afterEach(async function (){
    await driver.quit();
})

it('mocha test 1', function(){
    driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
    driver.wait(until.elementLocated(By.css(".alert")), 3000);
    driver.sleep(5000);
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
        console.log(result);
    });
})

it('mocha test 2', function(){
    driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
    driver.wait(until.elementLocated(By.css(".alert")), 3000);
    driver.sleep(5000);
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
        console.log(result);
    });
})

it('mocha test 23', function(){
    driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
    driver.wait(until.elementLocated(By.css(".alert")), 3000);
    driver.sleep(5000);
    driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
        console.log(result);
    });
})



});

    async function runDriver(driver) {
        await driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
        await driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
        await driver.wait(until.elementLocated(By.css(".alert")), 3000);
        await driver.sleep(5000);
        driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
            console.log(result);
        });
        // assert(false);
        
        
    }
// ['chrome'].forEach((browserName) => {
//     const driver = new webdriver.Builder().forBrowser(browserName).build();
//     runDriver(driver);
// })
