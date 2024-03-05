var stompClient = null
var username = null
var subscription = null


function connect() {
	username = localStorage.getItem("name");

	let socket = new SockJS("/wsdemo");

	stompClient = Stomp.over(socket);

	stompClient.connect({}, (frame) => {
		console.log("connected: " + frame);

		$("#name-from").addClass('d-none');

		$("#chat-room").removeClass('d-none');


		subscription = stompClient.subscribe("/topic/public", (res) => {
			showMsg(JSON.parse(res.body))
		})

		let body = {
			sender: username,
			type: "JOIN"
		}

		stompClient.send("/app/chat.register", {}, JSON.stringify(body));
	});






}


function showMsg(msg) {

	if (msg.type == "CHAT") {
		$("#message-container-table").append(`<tr> <td> <b>${msg.sender}:</b> ${msg.msg} </td> </tr>`)
	}
	else if (msg.type == "JOIN") {
		$("#message-container-table").append(`<tr class='d-flex justify-content-center'> 
  												<td class='text-center'> 
    												<b>${msg.sender} </b> joined the chat 
  												</td> 
											</tr>`)
	}
	else if (msg.type == "LEAVE") {
		$("#message-container-table").append(`<tr> <td> <center><b>${msg.sender} </b> left the chat </td></center> </tr>`)
	}
}

function sendMsg() {
	let body = {
		sender: username,
		msg: $("#message-value").val(),
		type: "CHAT"
	}

	stompClient.send("/app/chat.register", {}, JSON.stringify(body));

	document.getElementById("message-value").value = ""

}

function logout() {
	let body = {
		sender: username,
		type: "LEAVE"
	}
	stompClient.send("/app/chat.send", {}, JSON.stringify(body));

	subscription.unsubscribe();

	$("#name-from").removeClass('d-none');

	$("#chat-room").addClass('d-none');

	document.getElementById("message-container-table").innerHTML = '';
}

$(document).ready(e => {

	$("#login").click(() => {

		let name = $("#name-value").val();
		document.getElementById("name-value").value = ""
		localStorage.setItem("name", name);

		connect();

		document.getElementById("name-title").innerHTML = localStorage.getItem("name");
	});

	$("#send-btn").click(() => {
		sendMsg()
	});


	$("#logout").click(() => {
		logout()
	});


})


