import  { test, Locator,Page,expect} from  '@playwright/test';
import { allure } from 'allure-playwright';
import AllureReporter from 'allure-playwright';
var locators = require("..//fixtures/locators.json");


export class loginPage{
    readonly page: Page
    constructor(page:Page){
        this.page=page
        
    }

    protected locator: Locator;
    protected description: string;
    protected selector: string;

  async goToNetTrackUrl(url){
      await test.step("Navigate to Swag Lab Application", async () => {
        console.log(url);
        await this.page.goto(url);
      });
    }


  async loginToswaglab(userName,pword){
    await test.step("Logout the application for safe close", async () => {
        await test.step("Enter User Name", async () => {
          await expect(this.page.locator('#root > div > div.login_logo')).toHaveText('Swag Labs');
          await this.page.locator(locators.login.input_username).click();
          await this.page.locator(locators.login.input_username).fill(userName);
        });
        await test.step("Enter Password.", async () => {
          await this.page.locator(locators.login.input_password).click();
          await this.page.locator(locators.login.input_password).fill(pword);
        });
        await test.step("Select English United States", async () => {
          await this.page.locator(locators.login.loginpage).click();
          //await this.page.getByText('English (United States)').click();
        });
        await test.step("Click on Login button", async () => {
          await this.page.locator(locators.login.login).click();
        });
    });
  }
   

    
  async logout(){
    await test.step("Logout the application for safe close", async () => {
      this.page.waitForTimeout(1000);
      await this.page.locator('#react-burger-menu-btn').click();
      await this.page.locator(locators.login.logoff).click();
      await expect(this.page.locator('#root > div > div.login_logo')).toHaveText('Swag Labs');
    });
  }
}
export default loginPage;