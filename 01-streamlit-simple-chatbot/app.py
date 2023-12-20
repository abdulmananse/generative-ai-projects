import streamlit as st 

st.set_page_config(page_title="ChatBot", page_icon=":speech_balloon:")

st.title('ChatBot')
st.write("My first ChatBot")

if "messages" not in st.session_state:
    st.session_state.messages = []

def getMessages():
    for m in st.session_state.messages:
        with st.chat_message("Manan"):
            st.markdown(m) 

if prompt := st.chat_input("Please Ask a Question?"):
    st.session_state.messages.append(prompt)
    getMessages()