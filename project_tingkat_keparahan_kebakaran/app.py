from flask import Flask, render_template, request, jsonify
import joblib
import pandas as pd
# Tambahkan di app.py
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('model_rf_kebakaran.joblib')

label_mapping = {0: 'Rendah', 1: 'Sedang', 2: 'Tinggi'}
fitur = ['luas_area_kejadian', 'jumlah_sdm', 'jumlah_unit', 'jumlah_jiwa',
         'objek_bp', 'jumlah_kk', 'objek_bup', 'objek_bi']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = {f: [data[f]] for f in fitur}
    input_df = pd.DataFrame(input_data)
    pred_numeric = model.predict(input_df)[0]
    pred_label = label_mapping[pred_numeric]
    return jsonify({'label': pred_label})

if __name__ == '__main__':
    app.run(debug=True)