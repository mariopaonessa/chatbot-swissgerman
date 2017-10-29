import swissgermanbot

from flask import Flask, request
from flask_cors import CORS
app = Flask(__name__)

CORS(app)

@app.route("/")
def chat():
    text = request.args.get("text")
    session = request.args.get("session")
    return swissgermanbot.chat(text, session)


@app.route("/session")
def get_session():
    return swissgermanbot.get_session()


if __name__ == '__main__':
      app.run(host='0.0.0.0', port=5000)