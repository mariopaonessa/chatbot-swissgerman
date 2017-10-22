# -*- coding: utf-8 -*
from chatterbot.trainers import ListTrainer
from chatterbot import ChatBot

chatbot = ChatBot("Peter Müller",
                  preprocessors=['chatterbot.preprocessors.clean_whitespace'],
                  storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
                  logic_adapters=[
                      {
                          'import_path': 'chatterbot.logic.BestMatch'
                      },
                      {
                          'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                          'threshold': 0.65,
                          'default_response': 'Sorry ich ha di ned verstande'
                      }
                  ],
                  trainer='chatterbot.trainers.ListTrainer'
                  )

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

response = chatbot.get_response("Wie gdohts der")
print(response)