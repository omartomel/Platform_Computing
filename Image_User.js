const { Builder, By, until } = require('selenium-webdriver');

async function extendPresenceTime() {
    let startTime = Date.now();
    let presenceTime = 0;

    //sets up the Selenium
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        //opens & navigates to the specified page
        await driver.get('https://example.com/');






        //checks for images on the page using findElements & starts the count with 0
        let images = await driver.findElements(By.tagName('img'));
        let imageCount = images.length;
        let processedCount = 0;

        while (processedCount < imageCount) {
            //check if there are still images on the page
            images = await driver.findElements(By.tagName('img'));
            if (images.length > 0) {
                //extends presence by 10sec
                presenceTime += 10000;
                console.log('Presence time extended by 10 seconds.');

                //waits the extended 10sec
                await driver.sleep(10000);

                //updates the count of images
                processedCount++;
            } else {
                //no more images are found, break the loop
                break;
            }
        }






        //calculcates the time we spent on the page
        let endTime = Date.now();
        presenceTime += endTime - startTime;

        //displays time
        console.log(`Total presence time: ${presenceTime / 1000} seconds`);
    } finally {
        //closes
        await driver.quit();
    }
}

extendPresenceTime().catch(console.error);
