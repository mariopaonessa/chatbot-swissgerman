# -*- coding: utf-8 -*
from chatterbot.trainers import ListTrainer
from chatterbot import ChatBot


chatbot = ChatBot("Peter Müller")
conversation = [
    "Hoi",
    "Salü",
    "Hallo",
    "Mir gohts super!",
    "Das isch schön zum ghöre",
    "Danke",
    "Immer wieder"
]

chatbot.set_trainer(ListTrainer)
chatbot.train(conversation)



response = chatbot.get_response("Wie gohts der")
print(response)