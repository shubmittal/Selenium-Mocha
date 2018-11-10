import {By, until, Key, WebElement} from 'selenium-webdriver'
import Dashboard from './Dashboard'

export default class LoginPage{
    
     loc_h2 =  By.css("h2");
     loc_inputEmail = By.id("email");
     loc_inputPassword = By.id("password");
     loc_btnSubmit = By.css("button");
     errorMessages = {
            "email_blank":'"Email" is not allowed to be empty',
            "email_incorrectformat":'"Email" must be a valid email',
            "password_blank" :'"Password" is not allowed to be empty',
            "credentials_incorrect" :'Invalid email and/ or password.' 
        }
    
    constructor(driver)
    {
        this.driver = driver;
            }

      async isLoginPage ()
        {
            let email = await this.driver.findElement(this.loc_inputEmail);
            let password = await this.driver.findElement(this.loc_inputPassword);
            return (!!(email && password));
        }

        async __inputValue(field, value)
        {
            let element = await this.driver.findElement(field);
            await element.click()
            await element.sendKeys(...value);
            return;
        }

        async setBlankPassword()
        {
           await  this.__inputValue(this.loc_inputPassword, ["p",Key.BACK_SPACE ]);
           return;
        }
        async setBlankEmail()
        {
           await this.__inputValue(this.loc_inputEmail, ["p",Key.BACK_SPACE ]);
            return;
        }

        async setEmail(value)
        {
            await this.__inputValue(this.loc_inputEmail, [value]);
            return;
        }
        async setPassword(value)
        {
            await this.__inputValue(this.loc_inputPassword, [value]);
            return;
        }

        async clickSubmit()
        {
            let btn = await this.driver.findElement(this.loc_btnSubmit);
            await btn.click(); 
            return;    
        
        }

        async loginWithIncorrectCredentials()
        {
            let expectedMessage = this.errorMessages["credentials_incorrect"]
            let expectedErrorElement = By.xpath(`//*[text()='${expectedMessage}' ]`)
            await this.setEmail("mnradom@yopmail.com");
            await this.setPassword ("test");
            await this.clickSubmit();
            await this.driver.wait(until.elementLocated(expectedErrorElement));
            let element = this.driver.findElement(expectedErrorElement);
            return !!element;

        }

        async loginWithCorrectCredentials()
        {
            await this.setEmail("shubhra.goel@gmail.com");
            await this.setPassword ("5d7c864c-9ec4-4560-a050-3e0ad38518f4TEMP");
            await this.clickSubmit();
            let dashboardlocator =  Dashboard.getDefaultLocator();
            await this.driver.wait(until.elementLocated(dashboardlocator));
            let result= await this.driver.findElement(dashboardlocator);
            return !!result;
            

        }

        async isPresentErrorMessageFor(field)
        {
         
            let expectedMessage = this.errorMessages[field];
            var errorElement = await this.driver.findElement(By.xpath(`//*[text()='${expectedMessage}' ]`));
            return !!errorElement;
        }
    
}