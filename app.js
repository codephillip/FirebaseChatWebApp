{
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

	const db = firebase.firestore();

	var chatObject;
	db.collection("user").orderBy("createdAt", "desc").onSnapshot(
		(querySnapshot) => {
		    var usersLu = document.getElementById("users");
			clearElement(usersLu);

		    querySnapshot.forEach((doc) => {
		        console.log(`${doc.id} => ${doc.data()}`);
		        console.log('received 123 ' + doc.data().username + doc.data().createdAt);

		        var contactRow = document.createElement("LI");
		        contactRow.classList.add("contact");

		        contactRow.onclick = function() { 
		        	// alert('blah ' + doc.data().username); 
		        	var chat_messages = document.getElementById("chat_messages");
					chatObject = db.collection("user").doc(doc.id).collection("chat");
					chatObject2 = chatObject.orderBy("createdAt", "asc");
		        	chatObject2.onSnapshot(
						(querySnapshot) => {
							clearElement(chat_messages);

						    querySnapshot.forEach((doc) => {
						        console.log(`${doc.id} => ${doc.data()}`);
						        console.log('received 123 ' + doc.data().message);

						        var node = document.createElement("LI");

						        if (doc.data().name.includes("admin")) {
							        node.classList.add("replies");
							        var image = document.createElement("IMG");
									image.src = "https://safepal-production.s3-us-west-2.amazonaws.com/icons/woman_color.png";
						        } else {
						        	node.classList.add("sent");
						        	var image = document.createElement("IMG");
									image.src = "https://safepal-production.s3-us-west-2.amazonaws.com/icons/girl_color.png";
						        }
								var para = document.createElement("p");

								var textnode = document.createTextNode(doc.data().message);         // Create a text node
								para.appendChild(textnode);

								
								node.appendChild(image); 
								node.appendChild(para); 
								chat_messages.appendChild(node);
								scrollToBottom();
						    });
						}
					);

					var contactProfile = document.getElementsByClassName("contact-profile")[0];
					clearElement(contactProfile);

					var para2 = document.createElement("p");
					var textnode = document.createTextNode(doc.data().username);         // Create a text node
					para2.appendChild(textnode);

					var image2 = document.createElement("IMG");
					image2.src = "https://safepal-production.s3-us-west-2.amazonaws.com/icons/girl_color.png";
					contactProfile.appendChild(image2); 
					contactProfile.appendChild(para2); 
		        };

		        var wrapDiv = document.createElement("div");  
				wrapDiv.classList.add("wrap");

		        var onlineSpan = document.createElement("LI");
		        onlineSpan.classList.add("contact-status");
		        onlineSpan.classList.add("online");
		        wrapDiv.appendChild(onlineSpan);

		        var image = document.createElement("IMG");
				image.src = "https://safepal-production.s3-us-west-2.amazonaws.com/icons/girl_color.png";
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
	    });
	});

	function newMessage() {
		message = $(".message-input input").val();
		if($.trim(message) == '') {
			return false;
		}
		
		$('.message-input input').val(null);
		scrollToBottom();

		chatObject.add({
		    name: "admin",
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

	function scrollToBottom() {
		$(".messages").animate({ scrollTop: $(document).height() + 99999}, 100);
	}

	function clearElement(element) {
		while (element.firstChild) element.removeChild(element.firstChild);
	}
}{}
