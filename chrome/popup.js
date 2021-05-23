let get_tracklist_btn = document.getElementById("get_tracklist");
let tracklist_textarea = document.getElementById("tracklist_text")

get_tracklist_btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: read_tracklist,
  },
  (injectionResults) => {

	console.log(injectionResults[0].result);
	tracklist_textarea.value = "";
	tracklist_textarea.value = injectionResults[0].result;
  });
});


function read_tracklist(){
	
	
	if(document.querySelectorAll(".trackList__item").length == 0 ){
		return "";
	}
	
	var tracklist_data = [];

	document.querySelectorAll(".trackList__item").forEach(t => {
		var track_number = t.querySelector(".trackItem__number").textContent;
		var track_name = t.querySelector(".trackItem__trackTitle").textContent;
		tracklist_data.push({"track_number": track_number, "track_name": track_name});
	})
	console.log(tracklist_data);
	tracklist_data.sort(function(a, b) {
		return parseInt(a.track_number) - parseInt(b.track_name);
	});
	tracklist_string = ""
	
	var i;
	for (i = 0; i < tracklist_data.length; i++) {
	  tracklist_string += tracklist_data[i].track_number + " - " + tracklist_data[i].track_name;
	  if (i < tracklist_data.length-1){
		  tracklist_string += "\n";
	  }
	}
	// console.log(tracklist_string);
	return tracklist_string;
	
}

