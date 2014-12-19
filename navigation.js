mnl = 5;
mxl = 200;
function mfss(modern) {
	var sel = window.getSelection();
	sel.modify("move", "forward", "character");
	if (modern) // new version
		sel.modify("move", "backward", "character");
	sel.modify("extend", "forward", "sentence");
	sel = window.getSelection();
	if (sel.toString().length < mnl)
		mfss();
}
/**
 * move backward by using system functions by one sentence
 */
function mbss() {
	mxl = 200;
	mnl = 10;
	var sel = window.getSelection();
	sel.modify("move", "backward", "character");
	sel.modify("extend", "backward", "sentence");

	sel = window.getSelection();
	if (sel.toString().length < mnl)
		mbss();
}

/**
 * delim-char,min-length,max-length move backward upto character array specified
 */
function mbc() {
	ppa = [ ';', ':', '.', '(', ')', ',', '\n', '?' ];
	min = 4;
	max = 300;
	var selection = window.getSelection();
	selection.modify("move", "backward", "character");
	var ct = 0;
	while (true) {
		ct++;
		if (ct >= inf) {

			break; /* end of document */
		}

		ecb();
		var txt = window.getSelection().toString();
		var fch = txt.charAt(0);
		if (txt.length > max)
			break;
		// console.log(cts(ppa,txt));
		if (ppa.indexOf(fch) != -1 && txt.length > min) {

			break;
		}
	}
}
/**
 * delim-char,min-length,max-length move forward upto character array specified
 */
var inf = 1000;
function mfc() {
	npa = [ ';', ':', '.', '(', ')', ',', '\n', '?' ];
	min = 3;
	max = 300;
	// console.log("npa is "+npa);
	var selection = window.getSelection();
	selection.modify("move", "forward", "character");
	var ct = 0;
	while (true) {
		ct++;
		if (ct >= inf) {

			break; /* end of document */
		}

		ecf();
		var txt = window.getSelection().toString();
		var fch = txt.charAt(txt.length - 1);
		if (txt.length > max)
			break;
		// console.log(cts(npa,txt));
		if (npa.indexOf(fch) != -1 && txt.length > min) {

			break;
		}
	}
}

function ecf() {

	var sel = window.getSelection();
	sel.modify("extend", "forward", "character");
}
function ecb() {
	var sel = window.getSelection();
	sel.modify("extend", "backward", "character");
}

function mfw() {
	var sel = window.getSelection();
	sel.modify("move", "forward", "character");
	sel.modify("extend", "forward", "word");
}
/**
 * move backword by word
 */
function mbw() {
	var sel = window.getSelection();
	sel.modify("move", "backward", "character");
	sel.modify("extend", "backward", "word");
}

function mvis() {
	var scf = 0.3;
	var ele = window.getSelection().getRangeAt(0);
	var sel = ele.getBoundingClientRect();
	var dw = document.documentElement.clientWidth;
	var dh = document.documentElement.clientHeight;
	dw = window.innerWidth;
	dh = window.innerHeight;
	var st = sel.top;
	var sb = sel.bottom;
	var db = dh;
	var dt = 0;
	var amt = 0;
	if (st < 0) // too much up
	{
		// alert("st<0");
		amt = -1 * dh * scf;// 341 dh*scf;
	}
	if (sb > db) // too much down
	{
		// alert("sb>db");
		amt = dh * scf; // 341;
	}
	window.scrollBy(0, amt);
	// console.log(sel.top+" " +sel.right+" "+sel.bottom+" "+ sel.left+"\n"+dw+"
	// "+dh+" amt= "+amt);
	// console.error("scroll value "+amt);
	if (amt > 500)
		console.debug("scroll value too much " + amt);
}