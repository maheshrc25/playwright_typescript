import { test as base, Page } from '@playwright/test';
import Form from "../pages/loginPage"
import Home from "../pages/homePage"
import Genaric from '../helper/genaricMethods';


type UIPages = {
    loginPage : Form ;
    homePage : Home ;
    genaricMethods : Genaric;
}


export const test=base.extend<UIPages>({

   loginPage : async({page},use)=>{
   const from =new Form(page);
   await use(from);
   },

 homePage : async({page},use)=>{
    const home =new Home(page);
    await use(home);
    },


 genaricMethods : async({page},use)=>{
    const genaric =new Genaric(page);
    await use(genaric);
    },

});