import swissgermanbot

from flask import Flask, request
app = Flask(__name__)


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