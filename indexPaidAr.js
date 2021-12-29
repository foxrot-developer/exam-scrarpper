const puppeteer = require("puppeteer");
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws1 = fs.createWriteStream("ar21_part1.csv");
const ws2 = fs.createWriteStream("ar21_part2.csv");
const ws3 = fs.createWriteStream("ar21_part3.csv");

const url = "https://www.alrawitheorie.nl/exam/92/subscription/17137?lang=ar";


async function configureTheBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: '/usr/bin/google-chrome',
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });

    await page.type("#inputEmail", "Tamarariziq1@gmail.com");
    await page.type("#inputPassword", "123456789");
    await page.click("#app > main > div > div:nth-child(2) > div > div > div > form > button");

    await page.waitFor(25000);

    // Part 1
    await page.click("#app > main > div > div.row > div > button");

    let questions1 = [];
    for (i = 1; i <= 25; i++) {
        const result1 = await page.evaluate(() => {
            return {
                question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                option3_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
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
            if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(1)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: ''
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > input")) {
                return {
                    question_ar: '',
                    option1_ar: '',
                    option2_ar: '',
                    option3_ar: '',
                    reason_ar: '',
                    image_ar: ''
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div > div")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2_ar: '',
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(2) > div").innerText,
                    option3_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(3) > div").innerText,
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (!document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
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
            if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(1)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: ''
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > input")) {
                return {
                    question_ar: '',
                    option1_ar: '',
                    option2_ar: '',
                    option3_ar: '',
                    reason_ar: '',
                    image_ar: ''
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div > div")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2_ar: '',
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(1) > div").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(2) > div").innerText,
                    option3_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > div > div:nth-child(3) > div").innerText,
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)").innerText,
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
                };
            }
            else if (!document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(3)")) {
                return {
                    question_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div:nth-child(1) > div > h5").innerText,
                    option1_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(1)").innerText,
                    option2_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(2) > div > div > div.row.my-4.question-options > div > button:nth-child(2)").innerText,
                    option3_ar: '',
                    reason_ar: document.querySelector("#reason-modal > div > div > div:nth-child(2)").innerText,
                    image_ar: document.querySelector("#app > main > div > div.row > div.col-12.col-md-12 > div > div:nth-child(1) > div > div > div > div > img").src
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
            console.log("Writing of ar part 1 to CSV successful!");
        })
        .pipe(ws1);

    fastcsv
        .write(res.questions2, { headers: true })
        .on("finish", function () {
            console.log("Writing of ar part 2 to CSV successful!");
        })
        .pipe(ws2);

    fastcsv
        .write(res.questions3, { headers: true })
        .on("finish", function () {
            console.log("Writing of ar part 3 to CSV successful!");
        })
        .pipe(ws3);
});