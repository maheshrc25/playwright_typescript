import  { Page,test, expect,Locator } from "@playwright/test";
import { allure, } from "allure-playwright";
const data = require("..//fixtures/test_data.json");
var locators = require("..//fixtures/locators.json");

require('dotenv').config();

export class genaricMethods{
    readonly page: Page
    constructor(page:Page){
        this.page=page
    }


    // Method used to wait for element to load
    async waitForElementToLoad(locator){  
       await this.page.waitForSelector(locator); 
    }

    // Method used to wait for time -500,200..
    async waitFor(waitTime){
        await this.page.waitForTimeout(waitTime)
    }
    
    // Method used to navigate page back
    async goTopPageBack(){
        await this.page.goBack();
    }

    // Method used to navigate page go Forward
    async goTopPageForword(){
        await this.page.goForward();
    }

    async isElementPresent(locator: any) {
        // console.log(typeof locator.toString());
        let type = typeof locator;
        if (type === "string") {
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            return await this.page.locator(locator).isVisible();
        } else if (type === "object") {
            return await locator.isVisible();
        }

        console.log(type);
        console.log(type.toString());

    }

    async isElementEnabled(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).isEnabled();

    }

    async evaluateJS(jsDOM: any) {
        return await this.page.evaluate(jsDOM);

    }

    async getAttribute(locator: any, attribute: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).getAttribute(attribute)

    }

    async getText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).textContent();

    }
    async getInnerHTML(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.innerHTML(locator);
    }

    async clickonWebElement(locator: any) {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).click();

    }

    async getInnerText(locator: any) {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).innerText();
    }

    async enterText(locator:any,text:any){
        if (text) {
            await this.waitTillElementIsVisible(locator);
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            await this.page.locator(locator).fill(text);

        }
    }

    async  getIputBoxValue(locator: any)  {
        await this.waitTillElementIsVisible(locator);
        await this.page.locator(locator).scrollIntoViewIfNeeded();
        return await this.page.locator(locator).inputValue();
    }


    async waitTillElementIsVisible(elementSelector: any) {
        await this.page.waitForSelector(elementSelector)
    }

    async click(locator){
        await this.page.locator(locator).click();
    }

    async clickOnText(text:any){
        await this.page.getByText(text).click();
    }

    async navigateToBack(){
        await test.step("Navigate to Back.", async () => {
         await this.page.goBack();
        });
    }

    async pressEnter(){
        await test.step("Press enter Button.", async () => {
          await this.page.keyboard.press('Enter');
        });
     }
    async acceptDailog(){
        await test.step("Handle the dailog box.", async () => {
            this.page.on('dialog', async dialog => {
                expect(dialog.type()).toContain('confirm');
                expect(dialog.message()).toContain('Are you sure you want  to delete the item?');
                await dialog.accept();
            });
            await this.page.locator('//td[text()="Employees Hiring Rec02"]/preceding::a[2]').click();
    });
   }
}
export default genaricMethods;