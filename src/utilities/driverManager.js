import {Builder} from 'selenium-webdriver';
var SauceLabs = require("saucelabs")

const username = process.env.SAUCELAB_USERNAME;
const accessKey = process.env.SAUCELAB_ACCESSKEY;

export async function getDriver(option, buildName) {
    let driver;


    if (option == "SauceLabs") {
        let capabilities = {
            'browserName': 'Chrome',
            'version': 'latest',
            'platform': 'Linux',
            'build': buildName,
            'maxDuration': "10800",

        }
        let server = `http://${username}:${accessKey}@ondemand.saucelabs.com:80/wd/hub`
        driver = await new Builder().
        withCapabilities(capabilities).
        usingServer(server).
        build();
    } else {
        driver = new Builder().forBrowser('chrome').build();

    }


    return driver;

}

export async function cleanupDriver(driver, testName, testStatus, option) {

    if (option === "SauceLabs") {
        var myAccount = new SauceLabs({
            username,
            password: accessKey
        });

        try {
            let session = await driver.getSession();
            await myAccount.updateJob(session.id_, {
                "name": testName,
                "passed": testStatus
            });

        } catch (error) {

        } finally {
            driver.quit()
            return;
        }


    } else {
        driver.quit();
        return;

    }


}