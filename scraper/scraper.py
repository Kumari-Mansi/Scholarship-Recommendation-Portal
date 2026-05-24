import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["scholarshipDB"]
collection = db["scholarships"]

url = "https://www.myscheme.gov.in/schemes"

response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")

titles = soup.find_all("h2")

count = 0

for title in titles:

    name = title.text.strip()

    if len(name) < 5:
        continue

    scholarship = {
        "name": name,
        "category": ["all"],
        "gender": "any",
        "incomeLimit": 1000000,
        "state": "all",
        "education": ["ugc"],
        "applyLink": "https://www.myscheme.gov.in/schemes",
        "deadline": "Not Available"
    }

    if not collection.find_one({"name": name}):
        collection.insert_one(scholarship)
        count += 1

print(count, "new scholarships added")