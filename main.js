// GETTING APIFY AND THE HANDLER FUNCTION FOR THE PAGE
const Apify = require("apify");
const handlePage = require("./pageFunction/handlePage");

Apify.main(async () => {
    // GETTING THE INPUT
    const input = await Apify.getInput();

    // OPEN A REQUEST LIST
    const requestList = await Apify.openRequestList("productsURL", input);

    // CREATE A CheerioCrawler
    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction: handlePage,
    });

    // USE THE CRAWLER
    await crawler.run();
});
