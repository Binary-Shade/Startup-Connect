import pdfplumber
import spacy
import re
import requests
from datetime import datetime

# Load the spaCy NLP model
nlp = spacy.load("en_core_web_sm")

# Function to download PDF from a URL
def download_pdf(url, output_path):
    response = requests.get(url)
    with open(output_path, "wb") as file:
        file.write(response.content)

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() + "\n"
    return text

# Function to calculate work experience from date ranges
def calculate_experience(dates):
    total_experience = 0
    for start, end in dates:
        try:
            start_date = datetime.strptime(start, "%Y")
            end_date = datetime.strptime(end, "%Y")
            total_experience += (end_date - start_date).days / 365
        except ValueError:
            continue
    return round(total_experience, 1)

# Function to extract information from text
def parse_resume(text):
    doc = nlp(text)
    
    # Extract Name (assuming the first proper noun in the document as the name)
    name = None
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            break
    
    # Extract Contact Information
    phone = re.search(r"(\+?\d{1,3})?\s?-?\(?\d{2,3}\)?\s?\d{3,4}[-\s]?\d{4}", text)
    email = re.search(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b", text)
    
    # Extract Skills (simple example using keywords)
    skills = []
    skill_keywords = ["Python", "JavaScript", "SQL", "React", "Java", "Machine Learning", "Data Analysis"]
    for skill in skill_keywords:
        if skill.lower() in text.lower():
            skills.append(skill)
    
    # Extract Education (basic pattern search)
    education = []
    for ent in doc.ents:
        if ent.label_ in ["ORG", "GPE"] and any(keyword in ent.text for keyword in ["University", "College", "Institute"]):
            education.append(ent.text)
    
    # Extract Work Experience
    # Look for patterns like "2 years", "0 years"
    experience_years = re.findall(r"\b(\d+)\s+years?\b", text)
    total_experience = sum(int(year) for year in experience_years)
    
    # Look for date ranges like "2021 - 2022"
    date_ranges = re.findall(r"(\d{4})\s?-\s?(\d{4})", text)
    total_experience += calculate_experience(date_ranges)
    
    return {
        "Name": name,
        "Phone": phone.group() if phone else None,
        "Email": email.group() if email else None,
        "Skills": skills,
        "Education": education,
        "Total Work Experience (years)": total_experience
    }

# Test function
def test_resume_parser(pdf_path):
    text = extract_text_from_pdf(pdf_path)
    parsed_data = parse_resume(text)
    return parsed_data

# Updated URL to the resume PDF with dl=1 for direct download
pdf_url = "https://www.dropbox.com/scl/fi/ajunxehbnsbiyz7fs4acv/Suresh-BE-CSE-Fresher-2025.pdf?rlkey=k4ogrbn84319yatov1uzp3eux&dl=1"
pdf_path = "downloaded_resume.pdf"

# Download PDF from URL
download_pdf(pdf_url, pdf_path)

# Parse and print the extracted information
parsed_data = test_resume_parser(pdf_path)
print(parsed_data)
