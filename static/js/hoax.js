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

    // BotMSG
    let botMsg = document.createElement("div");
    botMsg.classList.add("message","bot");
    botMsg.innerHTML = formatAIResponse(data.reply);

    function formatAIResponse(text){

    let label = "";
    let indikator = "";
    let saran = "";

    let lines = text.split("\n");

    lines.forEach(line => {
        if(line.toLowerCase().includes("label")){
            label = line;
        }
        else if(line.toLowerCase().includes("-")){
            if(indikator !== null){
                indikator += `<li>${line.replace("-", "").trim()}</li>`;
            }
        }
    });

    let parts = text.split("Saran:");

    if(parts.length > 1){
        indikator = parts[0].split("Indikator:")[1] || "";
        saran = parts[1];
    }

    let indikatorHTML = indikator
        .split("\n")
        .filter(i => i.includes("-"))
        .map(i => `<li>${i.replace("-", "").trim()}</li>`)
        .join("");

    let saranHTML = saran
        .split("\n")
        .filter(i => i.includes("-"))
        .map(i => `<li>${i.replace("-", "").trim()}</li>`)
        .join("");

    return `
        <div class="ai-card">
            <div class="label">${label}</div>

            <div class="section">
                <b>⚠️ Indikator:</b>
                <ul>${indikatorHTML}</ul>
            </div>

            <div class="section">
                <b>✅ Saran:</b>
                <ul>${saranHTML}</ul>
            </div>
        </div>
    `;
}

    chatBox.appendChild(botMsg);

    // Backend Area End

    chatBox.scrollTop = chatBox.scrollHeight;
}


    // UX
    
const links = document.querySelectorAll(".navbar-link");

links.forEach((link) => {
  link.addEventListener("click", () => {
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 120;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    }
  });
});

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (scrollY >= sectionTop - 150) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

document.getElementById("userInput").addEventListener("keypress",function(e){

    if(e.key === "Enter"){
        e.preventDefault();
        sendMessage();
    }

});

document.getElementById("btnScroll").addEventListener("click", function() {
  document.getElementById("chatBot").scrollIntoView({
    behavior: "smooth"
  });
});