from PIL import Image
import easyocr

reader = easyocr.Reader(['en'], gpu=True)

import re

def extract_info(input_string):
    # Extracting branch
    branch_match = re.search(r'BRANCH([A-Z]+)', input_string)
    branch = branch_match.group(1) if branch_match else None

    # Extracting payee
    payee_match = re.search(r'PAY([A-Z]+)', input_string)
    payee = payee_match.group(1) if payee_match else None

    # Extracting payer
    payer = re.search(r',1(.*?)(?=\d)', input_string)
    payer = payer.group(1) if payer else None

    # Extracting amount
    amount_match = re.search(r'\{(\d+)/-', input_string)
    amount = amount_match.group(1) if amount_match else None

    # Extracting account number
    account_number = re.search(r'ALCNO,(\d+)(?=\D)', input_string)
    account_number = account_number.group(1) if account_number else None

    return branch, payee, payer, amount, account_number

def preprocess_image(input_path, output_path):
    # Open image
    image = Image.open(input_path)
    
    # Resize to width 1000, maintain aspect ratio
    width = 1000
    height = int((width / float(image.size[0])) * float(image.size[1]))
    image = image.resize((width, height))
    
    # Convert to grayscale
    image = image.convert('L')

    threshold = 128  # Threshold value, adjust as needed
    image = image.point(lambda p: p > threshold and 255)
    
    # Save preprocessed image
    image.save(output_path)

def perform_ocr(image_path):
    # Perform OCR
    text = reader.readtext(Image.open(image_path))
    return text

# Example usage
input_path = 'X_035.jpeg.jpg'
output_path = 'X_036.jpeg'

preprocess_image(input_path, output_path)
print('Image preprocessed successfully')

txt = ''

detections = perform_ocr(output_path)
for detection in detections:
        bbox, text, score = detection

        text = text.upper().replace(' ', '')

        txt += text

branch, payee, payer, amount, account_number = extract_info(txt)

print("Branch:", branch)
print("Payee:", payee)
print("Payer:", payer)
print("Amount:", amount)
print("Account Number:", account_number)
print("Text:", txt)