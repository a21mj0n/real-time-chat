const socket = io();
const chatForm = document.getElementById('chat-form');

socket.on('message', (message) => {
  const div = document.createElement('div')
  div.classList.add('message')

  const p = document.createElement('p')
  p.classList.add('meta')
  p.innerText = message
  div.appendChild(p)

  document.querySelector('.chat-messages').appendChild(div)
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const msg = e.target.elements.msg.value;

  // emit message to server
  socket.emit('chatMessage', msg);

});