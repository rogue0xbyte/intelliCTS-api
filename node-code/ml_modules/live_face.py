import cv2 as cv
import torch
from torchvision import transforms
from Model import DeePixBiS
import time
import base64
from io import BytesIO
import pandas as pd
import joblib
import datetime, json
import ssl, smtplib, hashlib, uuid
from werkzeug.utils import secure_filename
import os
import psycopg2
import sys
from flask import *

app = Flask(__name__)

@app.route('/real', methods=['GET', 'POST'])
def real():
    import cv2 as cv
    import torch
    from torchvision import transforms
    from Model import DeePixBiS

    model = DeePixBiS()
    model.load_state_dict(torch.load('./DeePixBiS.pth'))
    model.eval()

    tfms = transforms.Compose([
        transforms.ToPILImage(),
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))
    ])

    faceClassifier = cv.CascadeClassifier('Classifiers/haarface.xml')

    camera = cv.VideoCapture(0)

    result = []

    def generate_frames():
        while True:
            _, img = camera.read()
            grey = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
            faces = faceClassifier.detectMultiScale(grey, scaleFactor=1.1, minNeighbors=4)

            for x, y, w, h in faces:
                faceRegion = img[y:y + h, x:x + w]
                faceRegion = cv.cvtColor(faceRegion, cv.COLOR_BGR2RGB)

                faceRegion = tfms(faceRegion)
                faceRegion = faceRegion.unsqueeze(0)

                mask, binary = model.forward(faceRegion)
                res = torch.mean(mask).item()

                if res < 0.5:
                    cv.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)
                    cv.putText(img, 'Fake', (x, y + h + 30), cv.FONT_HERSHEY_COMPLEX, 1, (0, 0, 255))
                    
                else:
                    cv.rectangle(img, (x, y), (x + w, y + h), (0, 255,0), 2)
                    cv.putText(img, 'Real', (x, y + h + 30), cv.FONT_HERSHEY_COMPLEX, 1, (0, 255, 0))

            _, frame = cv.imencode('.jpg', img)
            frame = frame.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':    
    app.run(debug=True)
