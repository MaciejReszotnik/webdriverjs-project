import * as path from 'path';

import { By, promise, WebElement } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { PageLink } from '../enums/page_links.enum';
import { TextFieldType } from '../enums/textFieldTypes.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';

const Locator = {
  agreementCheckbox: () => By.xpath('//input[@data-parsley-required="true"]'),
  attachFileBtn: () => By.xpath('//input[@type="file"]'),
  errorMsg: () => By.xpath('//span[contains(@class, "caldera_ajax_error_block")]'),
  fileUploadField: () => By.xpath('//span[@class="file-name"]'),
  submitBtn: () => By.xpath('//input[@value="Jetzt Bewerben"]'),
  submitConfirmation: () => By.xpath('//div[contains(@class, "alert-success")]'),
  textField: (fieldName: string) => By.xpath(`//input[@placeholder="${fieldName}*"]`),
};

export class ApplicationFormPage extends BasePage {
  constructor(webUI: WebDriverWrapper) {
    super(webUI);
    this.url = PageLink.ApplicationFormPage;
  }

  public clickSubmitButton = (): promise.Promise<void> =>
    this.webUI.waitForVisibilityOfElement(Locator.submitBtn()).click()

  public getErrorMessages = async (): Promise<WebElement[]> =>
    (await this.webUI.waitForElements(Locator.errorMsg(), 2000))

  public uploadFile = (filePath: string): void => {
    const element = this.webUI.findElement(Locator.attachFileBtn());
    this.webUI.executeScript('document.querySelector("input[type=file]").removeAttribute("style");');
    element.sendKeys(filePath);
    this.webUI.executeScript('document.querySelector("input[type=file]").setAttribute("style", "display:none;");');
  }

  public isFileUploaded = (): promise.Promise<boolean> =>
    this.webUI.waitForElement(Locator.fileUploadField()).isDisplayed()
  public isFormPresent = (): promise.Promise<boolean> =>
  this.webUI.waitForElement(Locator.submitBtn(), 5000).isDisplayed()
  public isFormSubmitted = (): promise.Promise<boolean> => {
    this.webUI.sleep(1000);
    return this.webUI.waitForElement(Locator.submitConfirmation(), 5000).isDisplayed();
  }

  public fillInWholeForm = async () => {
    const filePath = path.join(__dirname, '../../files/', 'upload.jpg');
    await this.refreshPage();
    await this.fillInTextFiled('Maciej', TextFieldType.FirstName);
    await this.fillInTextFiled('Testerski', TextFieldType.SecondName);
    await this.fillInTextFiled('testersky@test.com', TextFieldType.Email);
    await this.uploadFile(filePath);
    await this.webUI.waitForElement(Locator.agreementCheckbox()).click();
  }

  public fillInTextFiled = (inputText: string, fieldType: TextFieldType): promise.Promise<void> =>
    this.webUI.waitForElement(Locator.textField(fieldType)).sendKeys(inputText)
}
