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
	var dic = {'Hello': 0, '你好': 6, '嗨': 9, '你': 5, '在': 11, '嗎': 8, '可以': 7, '幹嘛': 15, '黑翅': 49, '鳶': 46, '鳶介紹': 47, '介紹': 4, '黑': 48, '翅': 31, '鳥': 45, '那': 37, '隻': 42, '是': 18, '什麼': 3, '地圖': 12, '設計': 35, '概念': 22, ' 長': 41, '相': 27, '形狀': 16, '人工': 2, '棲架': 21, '竿子': 30, '桿子': 20, '那根': 39, '的': 26, '五福': 1, '社區': 28, '特色': 23, '稻米': 29, '霧峰': 43, '香米': 44, '土地': 10, '遊戲': 36, '玩法': 25, '怎麼': 17, '玩': 24, '大大的': 13, '黑鳥': 50, '花圃': 32, '時鐘': 19, '草堆': 33, '那個': 38, '奇怪': 14, '裝飾物': 34, '那陀草': 40}
	var len = Object.keys(dic).length
	var tfInput = [0];
	while(tfInput.length < len){
		tfInput.push(0);
	}
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
	"地圖的形狀設計為五福社區在Google地圖上的形狀。",
	"人工棲架，主要利用猛禽喜歡站在制高點的習性，只要在空曠的田區豎立棲架，就可以吸引牠們到田裡來幫忙抓老鼠，防治田區鼠害，適合空曠、缺乏高聳樹木的農田環境，增加黑翅鳶在田區停留的次數。",
	"五福社區位於台中霧峰，有著特殊的農業生態，當地所產之霧峰香米，為有機耕作，無農藥殘留，且結合環境永續之思想，藉由黑翅鳶來幫助捕捉農田中的有害動物。<br><img src='https://www.twwfsake.com/images/images/c4b1dd2f2f7fc2a0925e02a38aee4a20.jpg'>",
	"本遊戲需操控黑翅鳶，躲避障礙物來獲得分數。黑翅鳶在遊戲中會隨重力自然下降，點擊畫面可使黑翅鳶上升。",
	"那只是裝飾好看用的啦"];
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

displaySentence("歡迎來到五福社區，有什麼問題都可以問我喔！<br>（請輸入想問的問題，例如：五福社區、地圖設計、黑翅鳶、人工棲架、小遊戲、花圃......）", "bot")