// JavaScript Document

function displaySentence(sentences, who){
	
    let span = document.createElement("span");
	span.classList.add("replyMessage")
	
	if(who == "you")
		span.classList.add("you")
	else
		span.classList.add("bot")
	
    span.innerHTML = sentences;
    document.querySelector(".chatbotMessageWindow .displayMessage").append(span)
	document.querySelector(".chatbotMessageWindow .displayMessage").scrollTop = document.querySelector(".chatbotMessageWindow .displayMessage").scrollHeight;
}

async function sendMessageAndDisplay(message){
	document.querySelector(".chatbotMessageWindow .sendMessage input").value = "";
	displaySentence(message, "you");
	var dic = {'Hello': 0, '你好': 2, '黑翅': 10, '鳶': 7, '鳶介紹': 8, '介紹': 1, '黑': 9, '翅': 5, '地圖': 3, '設計': 6, '概念': 4}
	var tfInput = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var cut = [];
	call_jieba_cut(message, function (result) {
        cut = result;
    })

	cut.forEach(function(item){
		if(item in dic){
			tfInput[dic[item]]++;
		}
	})
	
	console.log(tfInput);
	tfInput = tf.tensor([tfInput])
	tfInput.print();
	let result = model.predict(tfInput).dataSync();
	let max = Math.max(...result);
	let position = result.indexOf(max);

	let resDic = ["您好請問有什麼需幫助的嗎?<br>(P.S.可輸入一些想知道的東西Ex.黑翅鳶、遊戲玩法......)", 
	"黑翅鳶（學名：Elanus caeruleus），又名黑肩鳶（不是指分布於澳大利亞，學名為Elanus axillari的物種黑肩鳶 )。 為鷹科鳶亞科黑翅鳶屬的一種鳥類。主要分布於東洋界和非洲的田野和半沙漠，另外在紐幾內亞、歐洲伊比利半島、尼羅河流域和阿特拉斯山脈以北的沿海地區也有分布。該物種的模式產地在阿爾及利亞阿爾及爾。黑翅鳶舊時與黑肩鳶、白尾鳶、紋翅鳶合併為一超種，並以一個指名亞種的形式存在。<br>  雖然在金門一直都有黑翅鳶族群，但台灣一直到2001年在雲林濱海記錄到繁殖成功後，都沒有長住的群體。目前黑翅鳶族群在台灣有拓展的趨勢，至今部分平原地區都可看到黑翅鳶的蹤跡。由於黑翅鳶的擴張被認為是自然移動所致，所以不認為是入侵種。 <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Black-shouldered_kite_%28Elanus_caeruleus_caeruleus%29_young_adult.jpg/330px-Black-shouldered_kite_%28Elanus_caeruleus_caeruleus%29_young_adult.jpg'>",
	"地圖的形狀設計為五福社區在Google地圖上肢形狀。"];
	let res = resDic[position];
	//console.log(position);
	/*
	let chatbotMessageWindow = document.querySelector(".chatbotMessageWindow");
	let token = chatbotMessageWindow.dataset.token;
	var data = new FormData()

    data.append('sentences', message)

    let url = "https://api.chatbot-api.tk/BotReply/" + token
	
	var res = await fetch(url,{
        method:"POST",
        body: data,
    }).then(function(response){
		return response.text();
    })
	*/
	displaySentence(res, "bot")
	
}


document.querySelector(".chatbotMessageWindow .sendMessage .sendMessageButton").onclick = function(){
	let message = document.querySelector(".chatbotMessageWindow .sendMessage input").value;
	sendMessageAndDisplay(message);
}

document.querySelector(".chatbotMessageWindow .sendMessage input").addEventListener("keypress", function(event){
	if(event.key == "Enter"){
		sendMessageAndDisplay(this.value)
	}
})
