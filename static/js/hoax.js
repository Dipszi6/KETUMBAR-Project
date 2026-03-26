async function sendMessage(){

    let input = document.getElementById("userInput");
    let message = input.value;

    if(message.trim() === "") return;

    let chatBox = document.getElementById("chatBox");

    // UserAreaMSG

    let userMsg = document.createElement("div");
    userMsg.classList.add("message","user");
    userMsg.innerText = message;

    chatBox.appendChild(userMsg);

    input.value = "";

    // UserAreaMSG typing

    let typing = document.createElement("div");
    typing.classList.add("message","bot");
    typing.innerText = "AI sedang mengetik...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    // UserArea End

    // Backend Area

    let response = await fetch("/chat",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:message
        })
    });

    let data = await response.json();
    console.log(data);

    typing.remove();

    let botMsg = document.createElement("div");
    botMsg.classList.add("message","bot");
    botMsg.innerText = data.reply;

    chatBox.appendChild(botMsg);

    // Backend Area End

    chatBox.scrollTop = chatBox.scrollHeight;
}


    // UX
    
document.getElementById("userInput").addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        sendMessage();
    }

});