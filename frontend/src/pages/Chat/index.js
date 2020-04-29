/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import io from 'socket.io-client';

import './styles.css';

export default function Chat(props) {
  const username = props.match.params.username;
  const [message, setMessage] = useState('');
  const [dateMsg, setDateMsg] = useState(moment().format('DD/MM/YY'));
  const [timeMsg, setTimeMsg] = useState(moment().format('HH:mm'));
  const [messages, setMessages] = useState([]);
  
  const socket = io('http://localhost:3333');
  
  useEffect(()=>{
    socket.on('chatHistory', messages => setMessages(messages));
  },[]);

  useEffect(() => {
    const handleMessages = message => setMessages([...messages , message]);

    socket.on('receivedMessage', handleMessages);

    return () => socket.off('receivedMessage', handleMessages);

  },[messages]);

  function handleSubmit(e) {
    e.preventDefault();
    
    
    if(username.length && message.length) {

      setDateMsg(moment().format('DD/MM/YY'));
      setTimeMsg(moment().format('HH:mm'));

      let messageObj = {
        dateMsg,
        timeMsg,
        username,
        message
      }
      
      socket.emit('sendMessage', messageObj);

      setMessage('');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} id="chat">
        <input 
          value={username}
          type="text"
          readOnly
          placeholder="Digite seu usuátio" 
        /> 
      
        <div className="messages">
          {messages.map((message,index) => (
            <div key={index} className="message">
              {message.dateMsg} <strong>{message.username}</strong> {message.timeMsg}: {message.message}
            </div>
          ))}
        </div>  
      
        <input 
          value={message}
          onChange={e => setMessage(e.target.value)}
          type="text" 
          placeholder="Digite sua mensagem" 
        />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
}