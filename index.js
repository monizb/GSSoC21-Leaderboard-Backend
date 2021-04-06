const fetch = require("node-fetch");
const express = require("express");
const schedule = require('node-schedule');
var cors = require('cors')

const app = express();
app.use(cors());

app.listen(3000, () => {
    console.log("ready on port 3000");
})

const projects = [
    "TesseractCoding/NeoAlgo",
    "praveenscience/Internship-LMS-FrontEnd",
    "Manthan933/Manthan",
    "awantika10/Desgen",
    "girlscript/Feminist-Bible-FrontEnd-Phase1",
    "vaibhavirohilla741/Operationalizing-ML",
    "DSC-JSS-NOIDA/foss-events",
    "akshitagupta15june/Face-X",
    "Swarnimashukla/Automatic-attendance-management-system",
    "srimani-programmer/Breast-Cancer-Predictor",
    "mishraaditya595/ScanIt",
    "purnima143/Kurakoo",
    "ALPHAVIO/BlogSite",
    "DSC-JSS-NOIDA/Plasma-Donor-App",
    "smaranjitghose/doc2pen",
    "himanshusharma89/relic_bazaar",
    "Algo-Phantoms/Algo-Tree",
    "Algo-Phantoms/Algo-Phantoms-Android",
    "Algo-Phantoms/Algo-Phantoms-Backend",
    "Algo-Phantoms/Algo-ScriptML",
    "Algo-Phantoms/Algo-Phantoms-Frontend",
    "geekquad/Image-Processing-OpenCV",
    "kritikaparmar-programmer/HealthCheck",
    "smaranjitghose/DocLense",
    "CoinShift-Imaging/CoinShift-Imaging-Box",
    "avinashkranjan/Friday",
    "himanshu007-creator/SFC-foundations",
    "PetalsOnWind/Statistics-and-Econometrics-for-Data-Science",
    "Srimathij/Indra_Bot",
    "dscciem/Pentesting-and-Hacking-Scripts",
    "ChetnaNSharma/Alumni-Connect",
    "cod-ed/simulate",
    "infiniteoverflow/Libro",
    "shagun25/SheHeroes",
    "khannakshat7/Elektra",
    "krayong/Study_Partner",
    "vigneshshettyin/Flask-Generate-Certificate",
    "Namanl2001/MERN-Gurujii-dev",
    "vikasdo/Book-Recommendation-Analysis",
    "PoojaMittal2842/Delhi-Tourism",
    "Praful932/Kitabe",
    "threefreespirited/Jssconnect",
    "Girl-Code-It/Opportunity-Calendar-Frontend",
    "Girl-Code-It/Opportunity-Calendar-Backend",
    "IndianOpenSourceFoundation/dynamic-cli",
    "harshcasper/speaked",
    "CodeFlow201/forestTreesTagging",
    "rhythm98/Food-Ordering-Application",
    "HITK-TECH-Community/Community-Website",
    "Vishal-raj-1/Awesome-JavaScript-Projects",
    "girlscript/Girscript-Community-Website",
    "Developer-Student-Clubs-VSSUT-Burla/College-Comrade",
    "Developer-Student-Clubs-VSSUT-Burla/CamOps",
    "adityabisoi/REST-fetch",
    "codezonediitj/pydatastructs",
    "FOSS-Cell-GECPKD/pixelvibe",
    "chiraag-kakar/sharenlearn",
    "vinitshahdeo/PortScanner",
    "ayan-biswas0412/gssoc2021-HotelOnTouch",
    "CrewMates-Open-Source/EduHelp.git",
    "knoldus/leaderboard",
    "srrathi/Hire-Smart",
    "klarEDA/klar-EDA",
    "gokulprathin8/Jaisalmer-E-Commerce",
    "vigneshshettyin/Bulk-Mailer",
    "avinashkranjan/Recess",
    "avinashkranjan/lifeMEDeasy",
    "avinashkranjan/Amazing-Python-Scripts",
    "Feminine-Divine/periodo",
    "aagarwal1012/Animated-Text-Kit",
    "kothariji/SyntaxMeets",
    "sruti2024/PRO_Act",
    "ProjectSakura/Mirai",
    "siv2r/kidney-exchange",
    "girlscript/feminist-bible-phase-2",
    "flow2ml/Flow2ML",
    "garg3133/JagratiWebApp",
    "Ayush-projects/chords",
    "ADRE9/bunk-manager-mern",
    "harshcasper/rotten-scripts",
    "fave77/pbchess",
    "ashishsahu1/ML-ProjectYard",
    "DhairyaBahl/React-Messenger-App",
    "Spectrum-CETB/LesKollab",
    "pratyushmp/Batua",
    "swapnilsparsh/Rescue",
    "pankajkumarbij/easy-job-intern",
    "Tejas1510/Athavani",
    "sairish2001/makesmatheasy",
    "Technocolabs100/Stack-Overflow-Tag-Predictions",
    "Developer-Student-Clubs-VSSUT-Burla/Master-PyAlgo",
    "i-tick/HackNitr-2020",
    "kaushik-rishi/rocketcp",
    "ambujraj/ambsql",
    "sairish2001/makesmatheasy-documentation",
    "ProjectSakura/ProjectSakura.github.io",
    "ProjectSakura/Mirai",
    "ProjectSakura/wiki",
    "ProjectSakura/maintainers",
    "ProjectSakura/wiki-redesign",
    "ProjectSakura/download"
];

let scores = {
    level0: 5,
    level1: 10,
    level2: 25,
    level3: 45
};
let leaderboard = {

}

let timestamp;

function updateleaderboard() {
    leaderboard = {}
    timestamp = new Date().toLocaleString();
    console.log("running")
    for (let m = 0; m < projects.length; m++) {
        fetch(`https://api.github.com/search/issues?q=repo:${projects[m]}+is:pr+label:gssoc21+is:merged&access_token=${process.env.TOKEN}`).then(response => response.json())
            .then(data => {
                if (data.items !== undefined) {
                    if (data.items.length !== 0) {
                        let prs = data.items;
                        for (let i = 0; i < prs.length; i++) {
                            for (let j = 0; j < prs[i].labels.length; j++) {
                                if (prs[i].labels[j].name.toLowerCase() === "level0" || prs[i].labels[j].name.toLowerCase() === "level1" || prs[i].labels[j].name.toLowerCase() === "level2" || prs[i].labels[j].name.toLowerCase() === "level3") {
                                    if (leaderboard[prs[i].user.login] === undefined) {
                                        leaderboard[prs[i].user.login] = {
                                            login: prs[i].user.login,
                                            id: prs[i].user.id,
                                            avatar_url: prs[i].user.avatar_url,
                                            profile_url: prs[i].user.html_url,
                                            pr_count: 1,
                                            level0: 0,
                                            level1: 0,
                                            level2: 0,
                                            level3: 0,
                                            pr_links: [],
                                            score: scores[prs[i].labels[j].name.toLowerCase()]
                                        }
                                    } else {
                                        leaderboard[prs[i].user.login].score = leaderboard[prs[i].user.login].score + scores[prs[i].labels[j].name.toLowerCase()],
                                            leaderboard[prs[i].user.login].pr_count += 1
                                    }
                                    leaderboard[prs[i].user.login].pr_links.push(prs[i].html_url);
                                    if (prs[i].labels[j].name.toLowerCase() === "level0") {
                                        leaderboard[prs[i].user.login][level0] += 1
                                    } else if (prs[i].labels[j].name.toLowerCase() === "level1") {
                                        leaderboard[prs[i].user.login][level1] += 1
                                    } else if (prs[i].labels[j].name.toLowerCase() === "level2") {
                                        leaderboard[prs[i].user.login][level2] += 1
                                    } else if (prs[i].labels[j].name.toLowerCase() === "level3") {
                                        leaderboard[prs[i].user.login][level3] += 1
                                    }
                                }
                            }
                        }
                    }
                }
            })
    }
}

updateleaderboard();

const job = schedule.scheduleJob('*/10 * * * *', async function (fireDate) {
    updateleaderboard();
});

app.get("/leaderboard", (req, res) => {
    res.json(
        {
            status: true,
            last_updated: timestamp,
            leaderboard: Object.values(leaderboard).sort(function (a, b) { return b.score - a.score })
        }

    )
});


