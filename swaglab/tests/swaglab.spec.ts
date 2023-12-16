import {expect, Page } from '@playwright/test';
import {test} from "../fixtures/custom-fixtures";
import { allure } from "allure-playwright";
import genaricMethods from '../helper/genaricMethods';
require('dotenv').config();
const data = require("..//fixtures/test_data.json");
var locators = require("..//fixtures/locators.json");


let username=data.application.username;
let password=data.application.password;
let baseurl=data.application.baseurl;
test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({page,browser},testInfo) => {
  testInfo.setTimeout(testInfo.timeout + 3000);
  allure.epic("Demo Test Suite");
  allure.link(data.application.baseurl, "Swag Lab Application.");
  });

test.describe('Demo Test Suite.',async()=>{
  
  test('TC_01 test to Login swag lab and checkout single product of application. @sanity', async ({ page,homePage,loginPage },testInfo) => {

  await loginPage.goToNetTrackUrl(baseurl);
  await expect(page.locator('#root > div > div.login_logo')).toHaveText(data.globla_assert.module);
  await loginPage.loginToswaglab(username,password);
  const screenshot = await page.screenshot();
  await testInfo.attach('Home Page-Screen', { body: screenshot, contentType: 'image/png' });
  await expect(page).toHaveTitle(data.globla_assert.module);

  await page.getByText(data.single.product_1).click();

  //Verify cost of the product
  const costOfProduct =await page.locator('div').filter({ hasText: "29.99" }).first().isVisible();
  expect(costOfProduct).toBeTruthy();

  //Verify add to cart button of the product
  const addCart =await page.locator('button').filter({ hasText: "Add to cart" }).first().isVisible();
  expect(addCart).toBeTruthy();
  await page.locator('button').filter({ hasText: "Add to cart" }).first().click();

  // Verify product add to the cart
  const remove =await page.locator('button').filter({ hasText: "Remove" }).first().isVisible();
  expect(remove).toBeTruthy();

  const bagCount = await page.locator('//span[@class="shopping_cart_badge"]');
  const bagsize = await bagCount.textContent();

  console.log("Bag size...:"+bagsize);
  expect(bagsize).toEqual(data.single.cart_size);

  await page.locator('a').filter({ hasText: '1' }).click();
  await page.getByText('Your Cart').click();
  await page.getByText('QTY').click();
  await page.getByText('Description').click();

  await page.locator('//*[@id="checkout"]').click();

  // Add addrsss details
  await page.locator('[data-test="firstName"]').fill(data.single.first_name);
  await page.locator('[data-test="lastName"]').fill(data.single.last_name);
  await page.locator('[data-test="postalCode"]').fill(data.single.pincode);
  await page.locator('[data-test="continue"]').click();

  await expect(page.locator('[data-test="finish"]')).toBeVisible();
  await expect(page.getByText('Payment Information')).toBeVisible();
  await expect(page.getByText('SauceCard #')).toBeVisible();
  await expect(page.getByText('Shipping Information')).toBeVisible();
  await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
  await expect(page.getByText('Price Total')).toBeVisible();
  await expect(page.getByText('Item total: $')).toBeVisible();
  await expect(page.getByText('Tax: $')).toBeVisible();

  await page.locator('[data-test="finish"]').click();
  await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Pony Express' })).toBeVisible();
  await expect(page.getByText('Your order has been')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.getByText('Checkout: Complete!').click();
  await expect(page.getByText('Checkout: Complete!')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByText('Products').click();


  //logout of swag lab application
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.getByText('Swag Labs').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  });

  test('TC_02 test to Checkout mutple products for swag lab. @sanity', async ({ page,homePage,loginPage },testInfo) => {
    await loginPage.goToNetTrackUrl(baseurl);
    await expect(page.locator('#root > div > div.login_logo')).toHaveText(data.globla_assert.module);
    await loginPage.loginToswaglab(username,password);
    const screenshot = await page.screenshot();
    await testInfo.attach('Home Page-Screen', { body: screenshot, contentType: 'image/png' });
    await expect(page).toHaveTitle(data.globla_assert.module);

    const productname_1 =await page.locator('//div[text()="Sauce Labs Backpack"]').textContent();
    expect(productname_1).toEqual("Sauce Labs Backpack");
    await page.locator('//div[text()="Sauce Labs Backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    const productname_2 =await page.locator('//div[text()="Sauce Labs Bolt T-Shirt"]').textContent();
    expect(productname_2).toEqual("Sauce Labs Bolt T-Shirt");
    await page.locator('//div[text()="Sauce Labs Bolt T-Shirt"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    const productname_3 =await page.locator('//div[text()="Sauce Labs Bike Light"]').textContent();
    expect(productname_3).toEqual("Sauce Labs Bike Light");
    await page.locator('//div[text()="Sauce Labs Bike Light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="back-to-products"]').click();

    await page.locator('a').filter({ hasText: '3' }).click();
    await page.getByText('Your Cart').click();
    await page.getByText('QTY').click();
    await page.getByText('Description').click();
    await page.locator('//*[@id="checkout"]').click();

    // Add addrsss details
    await page.locator('[data-test="firstName"]').fill(data.single.first_name);
    await page.locator('[data-test="lastName"]').fill(data.single.last_name);
    await page.locator('[data-test="postalCode"]').fill(data.single.pincode);
    await page.locator('[data-test="continue"]').click();

    await expect(page.locator('[data-test="finish"]')).toBeVisible();
    await expect(page.getByText('Payment Information')).toBeVisible();
    await expect(page.getByText('SauceCard #')).toBeVisible();
    await expect(page.getByText('Shipping Information')).toBeVisible();
    await expect(page.getByText('Free Pony Express Delivery!')).toBeVisible();
    await expect(page.getByText('Price Total')).toBeVisible();
    await expect(page.getByText('Item total: $')).toBeVisible();
    await expect(page.getByText('Tax: $')).toBeVisible();
  
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible();
    await expect(page.getByRole('img', { name: 'Pony Express' })).toBeVisible();
    await expect(page.getByText('Your order has been')).toBeVisible();
    await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
    await page.getByText('Checkout: Complete!').click();
    await expect(page.getByText('Checkout: Complete!')).toBeVisible();
    await page.locator('[data-test="back-to-products"]').click();
    await page.getByText('Products').click();


    //logout of swag lab application
    await page.getByRole('button', { name: 'Open Menu' }).click();
    await page.getByRole('link', { name: 'Logout' }).click();
    await page.getByText(data.globla_assert.module).click();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

});

