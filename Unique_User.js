const { Builder, By, until } = require('selenium-webdriver');

async function extendPresenceTime() {
    let startTime = Date.now();
    let presenceTime = 0;

    //sets up the Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //opens & navigates to the specified page
        await driver.get('https://wikibound.info/wiki/Boney');





        //check for the word "pet" on the page
        let bodyText = await driver.findElement(By.tagName('body')).getText();
        let petCount = (bodyText.match(/pet/gi) || []).length;

        //check for images on the page
        let images = await driver.findElements(By.tagName('img'));
        let imageCount = images.length;

        //check for links on the page
        let links = await driver.findElements(By.tagName('a'));
        let linkCount = links.length;

        //calculate the total count to determine the maximum loop iterations
        let totalCount = petCount + imageCount + linkCount;
        let processedCount = 0;

        while (processedCount < totalCount) {
            //check if there are still occurrences of "pet" on the page
            bodyText = await driver.findElement(By.tagName('body')).getText();
            if (bodyText.includes('pet')) {
                //extend presence by 1sec if its there
                presenceTime += 1000;
                console.log('Presence time extended by 1 second for "pet".');

                //wait the extended 1sec if its there
                await driver.sleep(1000);

                //update the count of "pet"s tracked
                petCount--;
                processedCount++;
            }

            //check if there are still images on the page
            images = await driver.findElements(By.tagName('img'));
            if (images.length > 0) {
                //extend presence by 1sec if so
                presenceTime += 1000;
                console.log('Presence time extended by 1 second for image.');

                //wait the extended 1sec if so
                await driver.sleep(1000);

                //update the count of images
                images.pop();
                processedCount++;
            }

            //check if there are still links on the page
            links = await driver.findElements(By.tagName('a'));
            if (links.length > 0) {
                //extend presence by 1sec if so
                presenceTime += 1000;
                console.log('Presence time extended by 1 second for link.');

                //wait the extended 1sec if so
                await driver.sleep(1000);

                //update the count of links
                links.pop();
                processedCount++;
            }
        }



        //calculate the time we spent on the page
        let endTime = Date.now();
        presenceTime += endTime - startTime;






        //display time
        console.log(`Total presence time: ${presenceTime / 1000} seconds`);
    } finally {
        //close
        await driver.quit();
    }
}

extendPresenceTime().catch(console.error);
