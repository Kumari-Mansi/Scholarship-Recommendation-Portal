from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from pymongo import MongoClient
import time
import re


URL = "https://www.buddy4study.com/scholarships"
MAX_SCHOLARSHIPS = 30

options = Options()
options.add_argument("--start-maximized")

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

wait = WebDriverWait(driver, 10)

client = MongoClient(
    "mongodb://mansi:Mansi123@ac-x0ac8a1-shard-00-00.b2oqhgs.mongodb.net:27017,ac-x0ac8a1-shard-00-01.b2oqhgs.mongodb.net:27017,ac-x0ac8a1-shard-00-02.b2oqhgs.mongodb.net:27017/scholarshipDB?ssl=true&replicaSet=atlas-x1hwib-shard-0&authSource=admin"
)
db = client["scholarshipDB"]
collection = db["scholarships"]

# collection.delete_many({}) This deletes ALL old scholarships every scrape.
print("Starting fresh scraping...")


def clean_text(text):
    return re.sub(r"\s+", " ", text).strip()

def extract_eligibility(driver):
    try:
        body_text = driver.find_element(By.TAG_NAME, "body").text

        match = re.search(
            r"Eligibility\s*(.*?)(Region|Award|Deadline|About The Program)",
            body_text,
            re.IGNORECASE | re.DOTALL
        )

        if match:
            eligibility_text = match.group(1).strip()

            eligibility_text = re.sub(r"\s+", " ", eligibility_text)

            eligibility_text = re.sub(
                r"Deadline.*",
                "",
                eligibility_text,
                flags=re.IGNORECASE
            )

            return eligibility_text[:150]

    except:
        pass

    return "Check official website"

def extract_provider(text):
    known_providers = [
        "Reliance Foundation",
        "Tata",
        "HDFC",
        "SBI",
        "Google",
        "Adobe",
        "Infosys",
        "ONGC"
    ]

    for provider in known_providers:
        if provider.lower() in text.lower():
            return provider

    return "Buddy4Study"

def extract_income(text):
    income = None

    income_sentences = re.findall(
        r"(family income.*?|annual income.*?|parental income.*?|income should not exceed.*?|income less than.*?)(?:\.|\n)",
        text,
        re.IGNORECASE
    )

    values = []

    for sentence in income_sentences:

        rupee_matches = re.findall(
            r'₹\s?(\d[\d,]*)',
            sentence
        )

        for m in rupee_matches:
            values.append(
                int(m.replace(",", ""))
            )

        lakh_matches = re.findall(
            r'(\d+(\.\d+)?)\s*lakh',
            sentence.lower()
        )

        for m in lakh_matches:
            values.append(
                int(float(m[0]) * 100000)
            )

    if values:
        income = min(values)

    return income

def extract_education(text):
    text_lower = text.lower()
    education = []

    if re.search(r"(10th|class 10|matric)", text_lower):
        education.append("10th")

    if re.search(r"(12th|class 12|intermediate)", text_lower):
        education.append("12th")

    if re.search(r"(undergraduate|bachelor)", text_lower):
        education.append("ug")

    if re.search(r"(postgraduate|master)", text_lower):
        education.append("pg")

    if re.search(r"(phd|doctoral)", text_lower):
        education.append("phd")

    if not education:
        education = ["all"]

    return list(set(education))

def extract_deadline(text):
    patterns = [
        r"\d{2}-[A-Za-z]{3}-\d{4}",
        r"\d{1,2}-[A-Za-z]{3}-\d{4}",
        r"\d{1,2}/\d{1,2}/\d{4}"
    ]

    for pattern in patterns:
        match = re.search(pattern, text)

        if match:
            return match.group()

    return "Check website"

def extract_structured_fields(eligibility_text):
    text = eligibility_text.lower()

    education = []

    if "10th" in text or "class 10" in text or "matric" in text:
        education.append("10th")

    if "12th" in text or "class 12" in text:
        education.append("12th")

    if "undergraduate" in text or "ug" in text or "bachelor" in text:
        education.append("ug")

    if "postgraduate" in text or "pg" in text or "master" in text:
        education.append("pg")

    if "phd" in text or "doctoral" in text:
        education.append("phd")

    if not education:
        education = ["all"]

    gender = "any"

    if "female" in text or "girl" in text or "women" in text:
        gender = "female"

    elif "male" in text:
        gender = "male"

    category = []

    if "sc" in text:
        category.append("sc")

    if "st" in text:
        category.append("st")

    if "obc" in text:
        category.append("obc")

    if "general" in text:
        category.append("general")

    if not category:
        category = ["all"]

    return education, gender, category

print("Opening Buddy4Study...")
driver.get(URL)

wait.until(
    EC.presence_of_element_located((By.TAG_NAME, "body"))
)

print("Loading scholarships...")

for i in range(10):
    driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight);"
    )
    time.sleep(2)

cards = driver.find_elements(
    By.XPATH,
    "//a[contains(@href,'/scholarship/')]"
)

links = []

for card in cards:
    link = card.get_attribute("href")

    if link and "/scholarship/" in link:
        links.append(link)

links = list(set(links))

print(f"Found {len(links)} scholarships")

processed = 0

for link in links[:MAX_SCHOLARSHIPS]:
    try:
        print(f"\nVisiting: {link}")

        driver.get(link)

        wait.until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )

        title = driver.find_element(
            By.TAG_NAME,
            "h1"
        ).text.strip()

        title = clean_text(title)
        title_lower = title.lower()

        skip_keywords = [
            "internship",
            "training",
            "bootcamp",
            "course"
        ]

        if any(word in title_lower for word in skip_keywords):
            print("Skipped:", title)
            continue

        foreign_keywords = [
            "uk government",
            "canada immigration",
            "australia visa",
            "international",
            "university of",
            "london",
            "uk",
            "usa",
            "canada",
            "foreign",
            "global"
        ]

        if any(word in title_lower for word in foreign_keywords):
            print("Skipped foreign:", title)
            continue

        body_text = driver.find_element(
            By.TAG_NAME,
            "body"
        ).text

        deadline = extract_deadline(body_text)
        income = extract_income(body_text)
        education = extract_education(body_text)
        eligibility = extract_eligibility(driver)
        if not eligibility or len(eligibility.strip()) < 5:
         eligibility = "Visit official portal for detailed eligibility"
        provider = extract_provider(body_text)
        
        education, gender, category = extract_structured_fields(eligibility)

        if (
            "deadline" in eligibility.lower()
            or len(eligibility) > 150
        ):
            eligibility = "Check official website"

        actual_apply_link = link

        try:
            apply_btn = driver.find_element(
                By.XPATH,
                "//a[contains(text(),'Apply Now')]"
            )

            btn_link = apply_btn.get_attribute("href")

            if btn_link and btn_link.startswith("http"):
                actual_apply_link = btn_link

        except:
            pass

        scholarship = {
            "name": title,
            "applyLink": actual_apply_link,
            "provider": provider,
            "category": category,
            "gender": gender,
            "incomeLimit": income,
            "state": "all",
            "education": education,
            "deadline": deadline,
            "eligibility": eligibility,
            "isProcessed": True,
            "scrapedAt": time.time()
        }

        collection.update_one(
            {"name": title},
            {"$set": scholarship},
            upsert=True
        )

        print("✅ Saved:", title)
        print("Deadline:", deadline)
        print("Income:", income)
        print("Eligibility:", eligibility)
        print("Provider:", provider)
        print("Apply Link:", actual_apply_link)

        processed += 1

    except Exception as e:
        print("❌ Error:", e)