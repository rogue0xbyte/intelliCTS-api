from PIL import Image
import pytesseract

def preprocess_image(input_path, output_path):
    # Open image
    image = Image.open(input_path)
    
    # Resize to width 1000, maintain aspect ratio
    width = 1000
    height = int((width / float(image.size[0])) * float(image.size[1]))
    image = image.resize((width, height))
    
    # Convert to grayscale
    image = image.convert('L')
    
    # Save preprocessed image
    image.save(output_path)

def perform_ocr(image_path):
    # Perform OCR
    text = pytesseract.image_to_string(Image.open(image_path), lang='eng')
    return text


if __name__ == '__main__':
    # Example usage
    input_path = '/Users/swetha/Downloads/cheque1.jpeg'
    output_path = '/Users/swetha/Downloads/cheque2.jpeg'

    preprocess_image(input_path, output_path)
    print('Image preprocessed successfully')

    result = perform_ocr(output_path)
    print('Result:', result)
