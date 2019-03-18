import 'chromedriver';
const assert = require('assert');
import { WebDriverWrapper } from './helpers/webdriverWrapper';
import { ThenableWebDriver } from 'selenium-webdriver';
require('mocha');
// require('chai');
const webdriver = require ('selenium-webdriver'),
    {describe, it, after, before} = require('selenium-webdriver/testing');
const By = webdriver.By;

let driver:WebDriverWrapper;

const Locator = {
    searchBox: () => By.css("#ember14"),
    searchBtn: () => By.xpath("//button[contains(text(),'Request')]"),
    alertBox: () => By.css(".alert")
}

describe('Start testing', function() {
    this.timeout(1000000);

beforeEach(function(){
    driver = new WebDriverWrapper('chrome');
    driver.navigateTo('https://library-app.firebaseapp.com/');
})

afterEach(async function (){
    await driver.quit();
})

it('mocha test 1', function(){
    driver.findElement(Locator.searchBox()).sendKeys('dddttt@hhht.com');
    driver.findElement(Locator.searchBtn()).click();
    driver.waitForElement(Locator.alertBox(), 5000).getText().then((result)=>{
        console.log(result);
        assert(result === 'czary mary');
    });
    driver.sleep(5000);
})

it('mocha test 2', function(){
    driver.findElement(Locator.searchBox()).sendKeys('dddttt@hhht.com');
    driver.findElement(Locator.searchBtn()).click();
    driver.waitForElement(Locator.alertBox(), 5000).getText().then((result)=>{
        console.log(result);
        
    });
    driver.sleep(5000);
})

// it('mocha test 23', function(){
//     driver.findElement(By.css("#ember14")).sendKeys("ddd@test.com");
//     driver.findElement(By.xpath("//button[contains(text(),'Request')]")).click();
//     driver.wait(until.elementLocated(By.css(".alert")), 3000);
//     driver.sleep(5000);
//     driver.findElement(By.xpath("//button[contains(text(),'Request')]")).getText().then(function(result) {
//         console.log(result);
//     });
// })



});
