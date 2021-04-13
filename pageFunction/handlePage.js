// GETTING APIFY
const Apify = require("apify");

const handlePage = async ({ request, $ }) => {
    // SCRAPPING DATA FROM WEB SITES
    const productName = $("div.mt-2 h1.font-bold.leading-none").text().trim();
    const productURL = request.url;
    const productPriceInt = $(
        "div.product-shop div.Price-current span.Price-int"
    )
        .text()
        .trim()
        .replace(".", "");

    // FORMATTING THE PRICE
    const productPriceDecimal = $(
        "div.product-shop div.Price-current sup.Price-dec"
    )
        .text()
        .trim()
        .replace(",", "");

    const productPrice = `${productPriceInt}.${productPriceDecimal}`;

    // CHECKING IF THE PRODUCT IS OUT OF STOCK
    const outOfStock = $("div.product-shop div.Status--outOfStock")["0"]
        ? true
        : false;

    // SETTING THE STOCK AND PRICE VALUES
    const stock = outOfStock ? "OutOfStock" : "InStock";
    const price = outOfStock ? "" : productPrice;

    // CREATING THE DATA
    const data = {
        ProductName: productName,
        ProductUrl: productURL,
        Price: price,
        Stock: stock,
    };

    // INSERTING THE DATA
    await Apify.pushData(data);
};

module.exports = handlePage;
