from openai import OpenAI
from dotenv import load_dotenv, find_dotenv
from openai.types.chat.chat_completion import ChatCompletion, ChatCompletionMessage
from typing import Any
import json
import requests
load_dotenv(find_dotenv())
import os

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
        self.tools = [
        {
            "type": "function",
            "function": {
                "name": "get_income_statement",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {"type": "string", "description": "The short name of the company"},
                        "period": {"type": "string", "description": "over a quarterly or annual period"},
                        "limit": {"type": "integer", "description": "periods to analyze"}
                    },
                    "required": ["ticker"],
                },
            },
        },
        {
            "type": "function",
            "function": {
                "name": "get_balance_sheet",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "ticker": {"type": "string", "description": "The short name of the company"},
                        "period": {"type": "string", "description": "over a quarterly or annual period"},
                        "limit": {"type": "integer", "description": "periods to analyze"}
                    },
                    "required": ["ticker"],
                },
            },
        }
    ]
        
    def send_message(self, message: str)-> any:
        
        self.addMessage(MessageItem(role="user", content=message))
        messages = [{"role": "user", "content": message}]
        response : ChatCompletion = self.client.chat.completions.create(
            model= self.model,
            messages= messages,
            tools= self.tools,
            tool_choice= "auto"
        )
        
        response_message: ChatCompletionMessage = response.choices[0].message

        tool_calls = response_message.tool_calls
        print("* First Reponse Tool Calls: ", tool_calls)

        if tool_calls:
            available_functions = {
                "get_income_statement": get_income_statement,
                "get_balance_sheet": get_balance_sheet,
            }
            messages.append(response_message)

            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_args = json.loads(tool_call.function.arguments)
                
                if function_name in available_functions:
                    function_to_call = available_functions[function_name]
                    
                    print("* function_to_call: ", function_to_call)

                    function_response = function_to_call(**function_args)
                    messages.append(
                        {
                            "tool_call_id": tool_call.id,
                            "role": "tool",
                            "name": function_name,
                            "content": function_response,
                        }
                    )
            
            second_response: ChatCompletion = self.client.chat.completions.create(
                model= self.model,
                messages= messages,
                stream= True
            )

            full_response: Any = ""
            for chunk in second_response:
                msg = chunk.choices[0].delta.content
                if msg != None:
                    full_response += msg
                    yield msg
        else:
            full_response = f"It seems like your message is just '{message}'. If you have any specific questions or if there's something specific you'd like assistance with, please provide more details so I can better help you!"
            yield full_response

        m = MessageItem("assistant", full_response)
        self.addMessage(m)
        return m
        
    def getMessages(self)->list[MessageItem]:
        return self.messages

    def addMessage(self, message: MessageItem)->None: 
        self.messages.append(message)

FMP_API_KEY = os.environ['FMP_API_KEY']

def get_income_statement(ticker, period = 'annual', limit = 10):
    url = f"https://financialmodelingprep.com/api/v3/income-statement/{ticker}?period={period}&limit={limit}&apikey={FMP_API_KEY}"
    response = requests.get(url)
    return json.dumps(response.json())

def get_balance_sheet(ticker, period = 'annual', limit = 10):
    url = f"https://financialmodelingprep.com/api/v3/balance-sheet-statement/{ticker}?period={period}&limit={limit}&apikey={FMP_API_KEY}"
    response = requests.get(url)
    return json.dumps(response.json())