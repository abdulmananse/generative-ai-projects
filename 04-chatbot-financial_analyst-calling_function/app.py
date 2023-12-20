import streamlit as st 
from model import OpenAIBot

st.set_page_config(page_title="ChatBot", page_icon=":speech_balloon:")

st.title('ChatBot')
st.write("AI Financial Analyst with function calling")

if "bot" not in st.session_state:
    st.session_state.bot = OpenAIBot("Math Tutor", instructions="You are a personal math tutor. Write and run code to answer math questions.")

for m in st.session_state.bot.getMessages():
    with st.chat_message(m.role):
        st.markdown(m.content)

if prompt := st.chat_input("Please Ask a Question"):
    
    with st.chat_message("user"):
        st.markdown(prompt)

    response = st.session_state.bot.send_message(prompt)
    
    with st.chat_message("assistant"):
        full_response: str = ""
        st_placeholder = st.empty()
        st_placeholder.markdown("...")
        for response_chunk in response:
            full_response += response_chunk
            st_placeholder.markdown(full_response)