(function fakers(){
document.getElementsByClassName('ErrorBanner fade_in')[0].style.display='none';
[].forEach.call(document.getElementsByClassName('vote_item_link add_upvote'),function(u){ u.onclick=function(){ return false;}});
[].forEach.call(document.getElementsByTagName("*"),function(el){ el.onclick=function(e){ console.log(e.srcElement); return false;} });
//location={href:'www.quora.com'}
f=0;
});
f=1;
f && speak(location.href);
var index=0;
var root=[].reduce.call(document.getElementsByClassName("PagedList"),function(p,n){ return p.children.length>n.children.length?p:n; })
//document.getElementsByClassName("Feed PagedList UniversalPageFeed");
//root=root[0];
var pl=root.children;
var cpl=pl[index];

var tagcounter=0;
var quecounter=0;
document.onkeydown=function(e){ 
var kc=(e.keyCode) ? e.keyCode : e.which;
var ks=String.fromCharCode(kc).toLowerCase();
if(ks=='t') tagcounter++;
else tagcounter=0;

if(ks=='q') quecounter++;
else quecounter=0;

if(tagcounter>=9) {
	where() && window.open(where().getElementsByClassName('topic_name')[0].href );
	tagcounter=0;
}

if(quecounter>=9) {
	where() && window.open(where().getElementsByClassName('question_link')[0].href );
	quecounter=0;
}

}

window.onblur=function(){ window.speechSynthesis.cancel(); }
document.onkeypress=function(e){
    var kc=(e.keyCode) ? e.keyCode : e.which;
    var ks=String.fromCharCode(kc).toLowerCase();
	//console.log("kc"+kc+" string "+ks);
    //mvis();
    if(ks=="'"){
        mfss();
        speak(window.getSelection().toString());
    }
    if(ks==";"){
        mbss();
        speak(window.getSelection().toString());
    }   
    if(ks=="w") //where am I
      speak(location.href);
    if(ks=="/")
      shift(1);
	if(ks==".")
	  shift(0);
	if(ks=="t")
	  speakTags();
	if(ks=='u')
	  upvote();
	if(ks=='d')
	  downvote();
	if(ks=='c')
	  comment();
	if(ks=='s')
	  share(); 
	if(ks=='n'){
		window.open("http://www.quora.com/notifications");
	   }
	 if(ks=='q'){
	 	speakQues();
	 } 
}
//Array.prototype.some.call(pl,function(e,i,arr){  cpl=pl[i]; return e.getElementsByClassName("QuestionText")[0];})
//pl=Array.prototype.filter.call(pl,function(p){ return p.getElementsByClassName("QuestionText")[0] }); 

function comment(){
	var dv=where() || cpl;
     	
}

function downvote(){
	var dv=where() ||cpl;
	if(!dv) return;
	var downvoteBtn=dv.getElementsByClassName('downvote')[0];
	if(downvoteBtn.innerText.trim().toLowerCase()=='downvote'){
	    downvoteBtn.click();
	    speak('downvoted');
	}
	else if(downvoteBtn){
	    downvoteBtn.click();
	    speak('downvote removed');
	}
}

function upvote(){
	var div=where() || cpl;
	if(!div) return;
	var upvoteBtn=div.getElementsByClassName('vote_item_link add_upvote')[0];
	if(upvoteBtn){
     upvoteBtn.click();
     speak('upvoted');
	}
	else if( upvoteBtn = div.getElementsByClassName('vote_item_link remove_upvote')[0]){
	upvoteBtn.click();
	speak('upvote removed');	
	}
    
	}

function share(){
	var dv=where() || cpl;
	if(!dv) return;
	var shareCard=dv.getElementsByClassName('share_link feed_card')[0];
	shareCard && shareCard.click();
	var counter=0; 
	var timeId= setInterval(function(){
		counter++;  
		var shareBtn=[].filter.call(document.getElementsByTagName("input"),function(e){ 
		return e.className=='submit_button'})[0];
		if(shareBtn){ 
			shareBtn.click();
			clearInterval(timeId); 
			speak("shared");
		}
		if(counter>15) {
			clearInterval(timeId); 
			console.error("network error "+timeId);
		}
		},800);
}

function speakTags(){
	var div=where() || cpl;
	if(!div) return;
	var tag=div.getElementsByClassName('TopicName')[0].innerText;
    speak(tag);
}

function speakQues(){
	var div=where() || cpl;
	if(!div) return;
	var quesText=div.getElementsByClassName('QuestionText')[0].innerText;
    speak(quesText);
}

function updateIndex(div){
	
	if(div){
	for(var i=0;pl[i];i++){
	 if(pl[i]==div){
	 index=i;
	 console.log('updated index is ',index);
	 break;	
	 }	
	}
}
}

function shift(d){
where() && updateIndex(where());
var dv=get(d);
console.log('got from get',dv);
if(!dv) return;
triggerLoad(dv);
dv.getElementsByClassName("QuestionText")[0] &&	(dv=dv.getElementsByClassName("QuestionText")[0]);
placeAtStart(dv); 
mfss(true);
//where() && where().scrollIntoView();
cpl.scrollIntoView();
}

function isvisible(dv){
	return dv.getClientRects()[0].height;
}

function get(d){
	//down
	if(d){
	for(var i=1;pl[index+i];i++){
	if(pl[index+i] && isvisible(pl[index+i])){
	//if(true)// isvisible(pl[index+1])){
		index+=i;
		cpl=pl[index];
		return cpl;
	}
	}
	}else{
	for(var i=1;pl[index-i];i--){
	if(pl[index-i] && isvisible(pl[index-i]) ){
		//if( true){ //isvisible(pl[index-1])){
			index-=i;
			cpl=pl[index];
			return cpl;
		}
	}
	}
	return cpl;
}


//start loading contents after 1.5 sec and focus not moved from pagedlist_item
function triggerLoad(dv){
 	//console.log('passing arg',dv);
	dv.getElementsByClassName('more_link')[0] && dv.getElementsByClassName('more_link')[0].click();
	window.setTimeout(
	function(){
	//console.log('load triggered',dv.id,where().id);
	if(where().id==dv.id){
	console.debug('click');
	var moreLinks=dv.getElementsByClassName('more_link');
	moreLinks.length && [].forEach.call(moreLinks,function(l){ l.click(); });
	}
	} ,1500);
};

//place selection at start of given element
function placeAtStart(dv){
	var rn=new Range();
	rn.setStartBefore(dv);
	rn.collapse(true);
	var sel=window.getSelection();
	sel.removeAllRanges();
	sel.addRange(rn);
}
//get returns the next paged item

function select(ele){
	var rn = new Range();
	rn.setStartBefore(ele);
	rn.setEndAfter(ele);
	var sl=window.getSelection();
	sl.removeAllRanges();
	sl.addRange(rn)
}
mnl=5; mxl=200;
function mfss(modern){
    var sel = window.getSelection(); 
    sel.modify("move","forward","character");
    if(modern) //new version
    sel.modify("move","backward","character");
    
    sel.modify("extend","forward","sentence");
    
    sel = window.getSelection(); 
    if(sel.toString().length<mnl)
        mfss();
}
/**
 * move backward by using system functions by one sentence
 */
function mbss()
{   mxl=200; mnl=10;
    var sel = window.getSelection(); 
    sel.modify("move","backward","character");
    sel.modify("extend","backward","sentence");

    sel=window.getSelection();
    if(sel.toString().length<mnl)
        mbss();    
}

function speakinit()
{
	window.onblur=function(){ window.speechSynthesis.cancel()};
}
function speak(text)
{
var utterance = new SpeechSynthesisUtterance(text.split("<speedofvoice1389867680568>")[0]);
//var rate=parseInt(text.split("<speedofvoice1389867680568>")[1]);
var voices = window.speechSynthesis.getVoices();
var ofv=voices.filter(function(v){return v.localService==true})[0];

if(ofv){
utterance.voice=ofv;
}
window.speechSynthesis.cancel();
window.speechSynthesis.speak(utterance);

}

function where(){
var el;
try{ 
el=window.getSelection().getRangeAt(0);
}catch(e){
	return;
}
if(!el) return;
el=el.startContainer;
while(el && el!=document.body){
el=el.parentElement;
if(el.className=="pagedlist_item")
break;
}
if(el && el.className=="pagedlist_item")
return el;

el=el.endContainer;
while(el && el!=document.body){
el=el.parentElement;
if(el.className=="pagedlist_item")
break;
}
if(el && el.className=="pagedlist_item")
return el;

}

function mvis()  
{
    var scf=0.3;
    var ele=window.getSelection().getRangeAt(0);        
    var sel = ele.getBoundingClientRect();               
    var dw  = document.documentElement.clientWidth;     
    var dh = document.documentElement.clientHeight;       
    dw=window.innerWidth;
    dh=window.innerHeight;
    var st=sel.top;
    var sb=sel.bottom;
    var db=dh; 
    var dt=0;
    var amt=0;
    if(st<0)     //too much up
    {
        //alert("st<0");
        amt=-1*dh*scf;//341 dh*scf; 
    }
    if(sb>db) //too much down
    {
        //alert("sb>db");
        amt=dh*scf; //341;    
    }
    window.scrollBy(0, amt);
     //console.log(sel.top+" " +sel.right+" "+sel.bottom+" "+ sel.left+"\n"+dw+" "+dh+" amt= "+amt);        
	 //console.error("scroll value "+amt);	 
	if(amt>500) 
        console.debug("scroll value too much "+amt);
}