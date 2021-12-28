const puppeteer = require("puppeteer");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws1 = fs.createWriteStream("en_part1.csv");
const ws2 = fs.createWriteStream("en_part2.csv");
const ws3 = fs.createWriteStream("en_part3.csv");

const url = "https://www.alrawitheorie.nl/free-exam/37?lang=en";


async function configureTheBrowser() {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });

    // Part 1
    await page.click("#app > main > div > div.row > div > button");

    let questions1 = [];
    for (i = 1; i <= 25; i++) {
        const result1 = await page.evaluate(() => {
            return {
                question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                option3: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
            };
        });

        questions1.push(result1);
        await page.click("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)");
    }

    // Part 2
    await page.click("#app > main > div > div.row > div > div > button");

    let questions2 = [];
    for (i = 1; i <= 12; i++) {
        const result2 = await page.evaluate(() => {
            if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(2) > div").innerText,
                    option3: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(3) > div").innerText,
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (!document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3: '',
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else {
                return
            }
        });

        questions2.push(result2);
        await page.click("#app > footer > div > div > div:nth-child(3) > button");
    }

    // Part 3
    await page.click("#app > main > div > div.row > div > div > button");

    let questions3 = [];
    for (i = 1; i <= 12; i++) {
        const result3 = await page.evaluate(() => {
            if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div > div")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2: '',
                    option3: '',
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(2) > div").innerText,
                    option3: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(3) > div").innerText,
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (!document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3: '',
                    reason: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else {
                return
            }
        });

        questions3.push(result3);
        await page.click("#app > footer > div > div > div:nth-child(3) > button");
    }

    await browser.close();
    return { questions1, questions2, questions3 };
}


configureTheBrowser().then(res => {
    console.log("Questions scrapping done");
    fastcsv
        .write(res.questions1, { headers: true })
        .on("finish", function () {
            console.log("Writing of en part 1 to CSV successful!");
        })
        .pipe(ws1);

    fastcsv
        .write(res.questions2, { headers: true })
        .on("finish", function () {
            console.log("Writing of en part 2 to CSV successful!");
        })
        .pipe(ws2);

    fastcsv
        .write(res.questions3, { headers: true })
        .on("finish", function () {
            console.log("Writing of en part 3 to CSV successful!");
        })
        .pipe(ws3);
});