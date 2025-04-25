const ChatpanelFactory = () => {
  const form = createElement("form", {
    onsubmit: handleMessageSubmission,
  });
  const messgaeBox = createElement("div", {
    className: "message-box",
  });
  const textArea = createElement("textarea", {
    name: "textArea",
    className: "message-input",
    placeholder: "enter some text",
  });

  const BtnContainer = createElement("div", {
    className: "send-cta-container",
  });

  const btn = createElement("button", {
    className: "send-cta",
    type: "submit",
  });
  const sendIcon = createElement("img", {
    src:"./assets/send.png"
  })
  btn.append(sendIcon)
  const chatList = createElement("ul", { className: "chat-content" });

  BtnContainer.append(btn);
  messgaeBox.append(textArea, BtnContainer);
  form.append(messgaeBox);
  let chatPanel = createElement("div", {
    className: "chat-panel",
  });
  chatPanel.append(chatList, form);
return chatPanel
 
};
