// 5.1 闭包是如何工作的
var outerValue = 'niaja';

var later;

function outerfunction(){
	var innerValue = 'Samurai';

	function innerfunction(paramValue){
		if(outerValue){
			console.log("Inner can see the niaja.");
		}
		if (innerValue) {
			console.log("Inner can see the Samurai!");
		}
		if (paramValue) {
			console.log("Inner can see the wakizashi");
		}
		if (tootate) {
			console.log("Inner can see the ronin.");
		}
	}
	later = innerfunction();
}
if (!tootate) {
	console.log("outer can't see the ronin!");
}

var tootate = "ronin";

outerfunction();

later("wakizashi");