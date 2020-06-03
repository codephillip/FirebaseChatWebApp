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
	// db.collection("users").add({
	//     first: "Ada",
	//     last: "Lovelace",
	//     born: 1815
	// })
	// .then(function(docRef) {
	//     console.log("Document written with ID: ", docRef.id);
	// })
	// .catch(function(error) {
	//     console.error("Error adding document: ", error);
	// });

	// db.collection("users").get().then((querySnapshot) => {
	//     querySnapshot.forEach((doc) => {
	//         console.log(`${doc.id} => ${doc.data()}`);
	//     });
	// });


	db.collection("user").onSnapshot(
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
				while (chat_messages.firstChild) chat_messages.removeChild(chat_messages.firstChild);
				
	        	db.collection("user").doc(doc.id).collection("chat").onSnapshot(
					(querySnapshot) => {
					    querySnapshot.forEach((doc) => {
					        console.log(`${doc.id} => ${doc.data()}`);
					        console.log('received 123 ' + doc.data().message);

					        var node = document.createElement("LI");                 // Create a <li> node
					        node.classList.add("sent");
							var para = document.createElement("p");

							var textnode = document.createTextNode(doc.data().message);         // Create a text node
							para.appendChild(textnode);
							node.appendChild(para); 

							console.log(textnode);
							console.log(node)
							var image = document.createElement("IMG");
							image.src = "http://emilcarlsson.se/assets/mikeross.png";
							node.appendChild(image); 
							
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

	// document.getElementById("users").addEventListener("click", function(e) {
	// 	console.log(e.target);
	// 	alert("clicked2");
	// 	console.log(e.target.parentElement)
	// 	// if (e.target && e.target.matches("li.contact")) {
	// 	// 	// e.target.className = "foo"; // new class name here
	// 	// 	alert("clicked ");
	// 	// }
	// });

	// function testfun (message) {
	// 	alert(message);
	// }

	// var anchors = document.getElementsByTagName('contact');
 //        for(var i = 0; i < anchors.length; i++) {
 //        	console.log()
 //            var anchor = anchors[i];
 //            anchor.onclick = function() {
 //                alert('ho ho ho');
 //            }
 //        }

 //    function setMyHandler(){
	//    var elements = document.getElementsByClassName('contact');
	//    for(var i = 0; i < elements.length; i++){
	//       console.log(elements[i]);

	//       elements[i].onclick = function(){
	//       	console.log("####");
	//       	alert('ho ho ho');
	//       };
	//    }
	// }

	// window.onload = setMyHandler();

	// $('.users li div').on('click', function(e) {
	//   alert("clicked ");alert("clicked ");
	// });
	//.innerhtml

	// document.getElementByClass("contact").addEventListener("click", alert("clicked "));

	// db.collection("users").onSnapshot(
	// 	(querySnapshot) => {
	//     querySnapshot.forEach((doc) => {
	//         console.log(`${doc.id} => ${doc.data()}`);
	//         console.log('received 123 ' + doc.data().first);
	//         var x = document.getElementsByClassName("example");
	//         var node = document.createElement("LI");                 // Create a <li> node
	//         node.classList.add("sent");
	// 		var para = document.createElement("p");

	// 		var textnode = document.createTextNode(doc.data().first + doc.data().last + doc.data().born);         // Create a text node
	// 		para.appendChild(textnode);
	// 		node.appendChild(para); 

	// 		console.log(textnode);
	// 		console.log(node)
	// 		var image = document.createElement("IMG");
	// 		image.src = "http://emilcarlsson.se/assets/mikeross.png";
	// 		node.appendChild(image); 
	// 		var mylist = document.getElementById("chat_messages");
	// 		console.log("##################");
	// 		console.log(mylist);
	// 		mylist.appendChild(node);
	//     });
	// });


	console.log("saved sample data");

	  // Initialize Firebase
	  
	//   firebase.analytics();

	//   // var db = firebase.firestore()

	// firebase.firestore().collection("sample").add({
	//     first: "Ada",
	//     last: "Lovelace",
	//     born: 1815
	// })
	// .then(function(docRef) {
	//     console.log("Document written with ID: ", docRef.id);
	// })
	// .catch(function(error) {
	//     console.error("Error adding document: ", error);
	// });
}{}
