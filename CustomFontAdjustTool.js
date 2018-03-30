/**
<!--------------------------- 
CUSTOM FONT ADJUSTMENT TOOL
---------------------------->
<!--NOTES--------------------
Insert this html and link to the CustomFontAdjustTool.css sheet.

<link rel="stylesheet" href="CustomFontAdjustTool.css">
<div id="fontBtnWrap">
	<div id="fontBtn">Resize Font</div>
	<div id="upDownDiv">
		<div id="up">+</div>
		<div id="down">-</div>
	</div>
</div>
<div id="fontArrayDisplay"></div>

If you want to exclude tags class or ID's from being adjusted add them to the excludedTags[] array.
------------------------------->
**/
<script type="text/javascript">		
var upDown = 1,
	fontTargets = [],
	//ADD TAGS TO EXCLUDED TAGS TO PREVENT FONT FROM BEING SELECTED OR ADJUSTED
	excludedTags = ["DIV","HTML","BODY","#fontArrayDisplay",'#fontBtnWrap','#up','#down','#upDownDiv','#fontBtn','.'],
	fontBtn = document.getElementById('fontBtn');
/* Change class to activate font controls*/
$(fontBtn).click(function(){
	$("#upDownDiv").toggle("slide" ,{direction: "left"}, 800);
	$(fontBtn).toggleClass("fontActive");
	if($('#fontBtn').hasClass("fontActive")){
		$(fontBtn).css("font-size", "17px");
		$(fontBtn).html("Select Text");
	}else {
		$(fontBtn).css("font-size", "18px");
		$(fontBtn).html("Resize Font");
	}
	 unHighlightFont();
});
/* Increase font size for all selected classes and tags*/
$("#up").click(function(){;
	increaseFont();
});
/* Decrease font size for all selected classes and tags*/
$("#down").click(function(){	
	decreaseFont();
});
/* Click event to determine which font to increase or decrease*/
$(this).click(function(e){
	if($('#fontBtn').hasClass("fontActive")){
		/* Uses class or tag if target isn't class*/					
		if(e.target.className == '' && e.target.id == ''){
			var fontSelector = (e.target.tagName);
			if(tagsToExclude(fontSelector)){
				duplicates(fontSelector);
			}
		}
		else if (e.target.id !== ""){
			var fontSelector =  '#' + (e.target.id);
			if(tagsToExclude(fontSelector)){
				duplicates(fontSelector);
			}
		}
		else if(e.target.className !== "fontActive") {
			var fontSelector = "." + (e.target.className);
			duplicates(fontSelector)
		}
		$("#fontArrayDisplay").html(fontTargets);
	}
})		
/*****************************
		FUNCTIONS 
*****************************/
	function unHighlightFont(){
		fontTargets.forEach(function(fontTarget){
			$(fontTarget).css("background-color", "white");
			fontTargets = [];
		});
	}	
	function duplicates(fontSelector){
			var index = fontTargets.indexOf(fontSelector);
			if(index > -1){
				fontTargets.splice(index, 1);
				$(fontSelector).css("background-color", "white");
			}
			else {
				fontTargets.push(fontSelector);
				$(fontSelector).css("background-color", "#207BBB");
			}	
	}
	function tagsToExclude(fontSelector){
		var index = excludedTags.indexOf(fontSelector);
		if(index > -1){
			return false;
		}else {
			return true;
		}
	}
	function increaseFont(){
		fontTargets.forEach(function(fontTarget){
			var currentSize = parseInt($(fontTarget).css("font-size"));
			$(fontTarget).css("font-size", currentSize + 4 + "px");
		});
	}
	function decreaseFont(){
		fontTargets.forEach(function(fontTarget){
			var currentSize = parseInt($(fontTarget).css("font-size"));
			$(fontTarget).css("font-size", currentSize - 4 + "px");
		});
	}

</script>
