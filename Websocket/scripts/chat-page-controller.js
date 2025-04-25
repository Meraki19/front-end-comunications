let receiverId = "";

const handleContactSelection = (e) => {
  const { id } = e.target;
  console.log(e.target.closest('p'))
  let text= e.target.closest('p').childNodes[0].nodeValue
  document.getElementById("selected-contact").innerHTML = "";
  let selectedContact = createElement("h3", {
    className: "selected-contact",
    textContent: text,
    // id: id,
  });
  receiverId = e.target.closest('p').id;
  document.getElementById("selected-contact").append(selectedContact);
  let currentChatPanel = chatPanelContainer.filter((chatPanel) => {
    return chatPanel.dataset.contactId == text;
  });
  console.log(currentChatPanel);
  const elChatPanelContainer = document.getElementById("chat-panel-container");
  if(document.querySelector('.chat-panel')) {
    document.querySelector('.chat-panel').remove()
  }


  elChatPanelContainer.append(currentChatPanel[0]);
};

const handleMessageSubmission = (e) => {
  e.preventDefault();

  let textArea = document.querySelector("[name=textArea]");
  if (receiverId !== "") {
    socket.emit("chatMessage", {
      from: document.getElementById("loged-in-user").textContent,
      to: document.getElementById(receiverId).childNodes[0].nodeValue,
      msg: textArea.value,
    });
    const chatItem = document.createElement("li");
    chatItem.classList.add("chat-item", "sent-message");
    chatItem.textContent = textArea.value;

    document.querySelector("ul.chat-content").append(chatItem);
    textArea.value = "";
  }
};

socket.on("ServerEmit", (messageReceived) => {
  const { from, message } = messageReceived;
  let recepientChaptPanel = chatPanelContainer.filter((item)=> {
     return item.dataset.contactId == from
    })
 
  if(recepientChaptPanel.length>0) {
    console.log(recepientChaptPanel)
    const chatItem = document.createElement("li");
  chatItem.classList.add("chat-item", "received-message");
  (chatItem.textContent = message)
  let currentul=recepientChaptPanel[0].querySelector("ul.chat-content")
  
  currentul.append(chatItem);   
//  console.log(recepientChaptPanel[0].dataset.cont)
   // recepientChaptPanel[0].append(currentul)
  }
  
});

socket.on('onlineUser', (userStatus)=> {
  console.log(userStatus)
const onlineContactel= document.getElementById(`${userStatus.user}-${userStatus.userId}`)
onlineContactel.querySelector('.current-status').style.backgroundColor='#2ad42a'
 onlineContactel.querySelector('.status-text').textContent="Online"
})

