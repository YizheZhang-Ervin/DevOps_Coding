from flask import Flask,jsonify
from flask_cors import CORS

app = Flask(__name__)

# Cross Domain
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/", methods=['GET', 'POST'])
def hello_world():
    jsonObj = {"result":"200 OK"}
    return jsonify(jsonObj)

if __name__ == '__main__':
    app.run()