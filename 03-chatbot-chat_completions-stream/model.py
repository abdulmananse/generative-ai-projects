

from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from openai.types.chat.chat_completion import ChatCompletion
from typing import Any

class MessageItem:
    def __init__(self, role: str, content: str | Any)->None:
        self.role = role
        self.content: str | Any = content

class OpenAIBot:
    def __init__(self, name:str, instructions:str, model:str = "gpt-3.5-turbo-1106")->None:
        self.name: str = name
        self.instruction: str = instructions
        self.model: str = model
        load_dotenv(find_dotenv())
        self.client: OpenAI = OpenAI()
        self.messages: list[MessageItem] = []

    def send_message(self, message: str)-> str:
        
        self.addMessage(MessageItem(role="user", content=message))

        response : ChatCompletion = self.client.chat.completions.create(
            model=self.model,
            messages=[{"role": "user", "content": message}],
            stream=True
        )
        
        full_response: Any = ""
        for chunk in response:
            msg = chunk.choices[0].delta.content
            if msg != None:
                full_response += msg
                yield msg

        m = MessageItem("assistant", full_response)
        self.addMessage(m)
        return m
    
    def getMessages(self)->list[MessageItem]:
        return self.messages

    def addMessage(self, message: MessageItem)->None: 
        self.messages.append(message)