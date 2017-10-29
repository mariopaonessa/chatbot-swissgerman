# -*- coding: utf-8 -*
from chatterbot import ChatBot


chatbot = ChatBot("Peter Müller",
                  preprocessors=['chatterbot.preprocessors.clean_whitespace'],
                  #storage_adapter="chatterbot.storage.MongoDatabaseAdapter",
                  logic_adapters=[
                      {
                          'import_path': 'chatterbot.logic.BestMatch'
                      },
                      {
                          'import_path': 'chatterbot.logic.LowConfidenceAdapter',
                          'threshold': 0.6,
                          'default_response': 'Sorry ich ha di ned verstande'
                      }
                  ],
                  trainer='chatterbot.trainers.ChatterBotCorpusTrainer'
                  )


chatbot.train('corpus.data-chde')


def get_session():
    conversation_session = chatbot.conversation_sessions.new()
    return conversation_session.id_string


def chat(text, session_string):
    response = chatbot.get_response(text, session_string)
    return str(response)
