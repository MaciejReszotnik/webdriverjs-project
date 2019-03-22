import { By, promise } from 'selenium-webdriver';
import { BasePage } from './basePage';
import { PageLink } from './../enums/page_links.enum';
import { WebDriverWrapper } from '../helpers/webdriverWrapper';

const Locator = {
  contactFormBtn: () => By.xpath('//a[text()="Bewirb dich jetzt!"][1]'),
};

export class CareerPage extends BasePage {
  constructor(webUI: WebDriverWrapper) {
    super(webUI);
    this.url = PageLink.CareerPage;
  }

  public clickContactButton = (): promise.Promise<void> =>
    this.webUI.waitForVisibilityOfElement(Locator.contactFormBtn()).click()
}
