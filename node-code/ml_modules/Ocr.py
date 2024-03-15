import cv2
import pytesseract
from pytesseract import Output
import re, os

def extract_account_and_ifsc(file_path):
    myconfig = r"--psm 11 --oem 3"
    img = cv2.imread(file_path)
    height, width, _ = img.shape
    flag1 = False

    data = pytesseract.image_to_data(img, config=myconfig, output_type=Output.DICT)

    account_number_regex = r'\b\d{10,18}\b'
    ifsc_code_regex = r'\b[A-Z]{4}[A-Z0-9a-z]{5}[0-9]{1}[A-Z0-9a-z]{1}\b'

    account_number = None
    ifsc_code = None
    for text in data['text']:
        match_account_number = re.search(account_number_regex, text)
        match_ifsc_code = re.search(ifsc_code_regex, text)
        if match_account_number and not flag1:
            account_number = match_account_number.group(0)
            flag1 = True
        if match_ifsc_code:
            ifsc_code = match_ifsc_code.group(0)

    return {"Account Number": account_number, "IFSC Code": ifsc_code}

# Example usage:
file_path = "signature_ident_data/X"
data = []
for file in os.listdir(file_path):
    result = extract_account_and_ifsc('./'+file_path+'/'+file)
    data.append(result)