{
	// links
	/*
	https://github.com/firebase/snippets-web/blob/cee9068490fbfb03c123fbda87bc08a73a122520/firestore/test.firestore.js#L306-L310
	https://firebaseopensource.com/projects/firebase/friendlyeats-web/
	*/
	// import 'firebase/firestore';

	// const firebase = require("firebase");
	// Required for side-effects
	// require("firebase/firestore");
	  // Your web app's Firebase configuration

    // document.getElementById("users").addEventListener("click", alert("clicked "));

 //    function init(){
	//     document.getElementById("users").addEventListener("click", function(){
	//         alert("Test successful");
	//     });
	// }
	// window.onload = init();
	// console.log('123');


	  var firebaseConfig = {
	    apiKey: "AIzaSyB5iDUqe5BP2PwQup8ZcV-GXBpmdypCo-Q",
	    authDomain: "safepal-85032.firebaseapp.com",
	    databaseURL: "https://safepal-85032.firebaseio.com",
	    projectId: "safepal-85032",
	    storageBucket: "safepal-85032.appspot.com",
	    messagingSenderId: "991858471604",
	    appId: "1:991858471604:web:992a2906ba8b200b711de1",
	    measurementId: "G-Y3BFE0LYGZ"
	  };

	firebase.initializeApp(firebaseConfig);

	console.log("start firestore");

	var db = firebase.firestore();

	var chatObject;
	db.collection("user").orderBy("createdAt", "desc").onSnapshot(
		(querySnapshot) => {
	    querySnapshot.forEach((doc) => {
	        console.log(`${doc.id} => ${doc.data()}`);
	        console.log('received 123 ' + doc.data().username + doc.data().createdAt);
	        var usersLu = document.getElementById("users");

	        var contactRow = document.createElement("LI");
	        contactRow.classList.add("contact");

	        contactRow.onclick = function() { 
	        	// alert('blah ' + doc.data().username); 
	        	console.log('clicked');
	        	console.log('###############')
	        	console.log(doc.data())
	        	console.log(doc.id)

	        	var chat_messages = document.getElementById("chat_messages");
				console.log("##################");
				console.log(chat_messages);

				chatObject = db.collection("user").doc(doc.id).collection("chat");
				chatObject2 = chatObject.orderBy("createdAt", "asc");
	        	chatObject2.onSnapshot(
					(querySnapshot) => {
						while (chat_messages.firstChild) chat_messages.removeChild(chat_messages.firstChild);

					    querySnapshot.forEach((doc) => {
					        console.log(`${doc.id} => ${doc.data()}`);
					        console.log('received 123 ' + doc.data().message);

					        var node = document.createElement("LI");

					        if (doc.data().name.includes("admin")) {
						        node.classList.add("replies");
					        } else {
					        	node.classList.add("sent");
					        }
							var para = document.createElement("p");

							var textnode = document.createTextNode(doc.data().message);         // Create a text node
							para.appendChild(textnode);

							console.log(textnode);
							console.log(node)
							var image = document.createElement("IMG");
							image.src = "http://emilcarlsson.se/assets/mikeross.png";
							node.appendChild(image); 
							node.appendChild(para); 
							
							chat_messages.appendChild(node);
					    });
					}
				);
				console.log('clicked2');
	        };

	        var wrapDiv = document.createElement("div");  
			wrapDiv.classList.add("wrap");

	        var onlineSpan = document.createElement("LI");
	        onlineSpan.classList.add("contact-status");
	        onlineSpan.classList.add("online");
	        wrapDiv.appendChild(onlineSpan);

	        var image = document.createElement("IMG");
			image.src = "http://emilcarlsson.se/assets/mikeross.png";
			wrapDiv.appendChild(image);

			var metaDiv = document.createElement("div");  
			metaDiv.classList.add("meta");

			var para = document.createElement("p");
			para.classList.add("name");
			var textnode = document.createTextNode(doc.data().username);
			para.appendChild(textnode);
			metaDiv.appendChild(para);

			var para = document.createElement("p");
			para.classList.add("preview");
			var createdAt = doc.data().createdAt;
			var textnode = document.createTextNode(String(createdAt.toDate()).split('GMT')[0]);
			para.appendChild(textnode);
			metaDiv.appendChild(para);

			wrapDiv.appendChild(metaDiv);

			contactRow.appendChild(wrapDiv);
			usersLu.appendChild(contactRow);

			// setMyHandler();
	    });
	});

	function newMessage() {
		// alert("test");

		message = $(".message-input input").val();
		if($.trim(message) == '') {
			return false;
		}
		
		$('.message-input input').val(null);
		$(".messages").scrollTop(1500);
		// var $target = $('html,body'); 
		// $target.animate({scrollTop: $target.height()}, 1000);
		$(".messages").animate({ scrollTop: $(document).height() + 99999}, 100);

		console.log("chat object");
		console.log(chatObject);
		chatObject.add({
			//todo add admin name
		    name: "admin4444",
		    message: message,
		    createdAt: new Date()
		})
		.then(function(docRef) {
		    console.log("Document written with ID: ", docRef.id);
		})
		.catch(function(error) {
		    console.error("Error adding document: ", error);
		});
	}
}{}
