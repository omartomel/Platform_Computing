const { By, Builder, Browser } = require('selenium-webdriver');
const assert = require("assert");

(async function firstTest() {
  let driver;
  
  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get('http://localhost:3000/');
  


    let startTime = new Date().getTime(); // Record start time when the page loads
    let scrollDistance = 0; // Initialize scroll distance
  



    // Function to measure scroll distance
    await driver.executeScript(function() {
      window.onscroll = function() { 
        scrollDistance = window.scrollY; // Update scroll distance when the user scrolls
      }
    });
  



    // Function to measure time spent on page
    setInterval(async function() {
      let currentTime = new Date().getTime();
      let elapsedTime = (currentTime - startTime) / 1000; // Convert milliseconds to seconds
      console.log("Time spent on page: " + elapsedTime + " seconds");
      console.log("Scroll distance: " + scrollDistance + " pixels");
    }, 1000); // Update the information every second, redoes it
  



//End
  
  } catch (e) {
    console.log(e)
  } finally {
    //await driver.quit();
  }
})();
