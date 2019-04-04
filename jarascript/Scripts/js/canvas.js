	
$( document ).ready(function() {
	obj = new videoComponentViewModel();
	obj.canvasInit();
});	
	
function videoComponentViewModel(){
	var self = this;
	self.canvas = document.getElementById('canvas'),
	self.ctx = self.canvas.getContext('2d'),
	self.rect = {};
	self.rectArray = new Array();
	self.drag = false;
	self.select = false;
	self.posiX = 0; // for move
	self.posiY = 0; // for move
	self.mouseX = 0;
	self.mouseY = 0;
	self.closeEnough = 5;
	self.dragTL = self.dragBL = self.dragTR = self.dragBR = false;
	self.color = ko.observable("black");
	self.color = "yellow"; 
	self.index = 0; // index of rectArray
	self.lastMouseDown = new Date().getTime();
	self.lastMouseUp = new Date().getTime();
	self.doubleClickThreshold = 0; //ms
	self.downCnt = 0;
	self.upCnt = 0;
	self.regionName = ko.observable();
	self.regionName = "region_1";
	
	
}

videoComponentViewModel.prototype.canvasInit = function () {
	var self = this;
	//this.canvas.height = this.canvas.offsetParent.clientHeight;
	//this.canvas.width = this.canvas.offsetParent.clientWidth;
	this.canvas.height = 400;
	this.canvas.width = 400;
	
	this.canvas.addEventListener('mousedown', function(e){
		videoComponentViewModel.prototype.mouseDown(e,self);
	}, false);
	this.canvas.addEventListener('mouseup', function(e){
		videoComponentViewModel.prototype.mouseUp(e,self);
	}, false);
	this.canvas.addEventListener('mousemove', function(e){
		videoComponentViewModel.prototype.mouseMove(e,self);
	}, false);
}

videoComponentViewModel.prototype.mouseDown = function (e,source) {
	console.log("single mouse down!!!!!!!!!!!");
	//source.mouseX = e.pageX - source.canvas.offsetParent.offsetLeft;
	//source.mouseY = e.pageY - source.canvas.offsetParent.offsetTop;
	source.mouseX = e.offsetX;
	source.mouseY = e.offsetY;
	
	// if there isn't a rect yet
	if (source.rectArray.length === 0) {
		var newRect = {startX:source.mouseX,startY:source.mouseY,w:0,h:0,color:'black',regionName:'region_1'};
		//source.regionName(newRect.regionName);
		source.rectArray.push(newRect);
		source.select = true;
	}
	else if (source.checkInRectangle(source.mouseX, source.mouseY)) {
		// handle move
		source.drag = true;
		
		for (i=0; i< source.rectArray.length; i++){
			console.log("color:"+source.rectArray[i].color);
			if (source.rectArray[i].color == 'green' && i != source.index) {
				source.rectArray[i].color = 'black';
				//break;
			}
		}
		if (source.rectArray[source.index].color == 'green')
			 source.rectArray[source.index].color = 'black';
		else
			source.rectArray[source.index].color = 'green';

		// source.draw(source.rectArray[source.index]);
		// source.drawHandles(source.rectArray[source.index]);
		source.draw();

		source.posiX = source.mouseX - source.rectArray[source.index].startX;
		source.posiY = source.mouseY - source.rectArray[source.index].startY;
	} 
	else if (source.checkCloseEnough(source.mouseX, source.mouseY)) {
		//source.ctx.clearRect()
		source.draw(source.rectArray[source.index]);
	}
	else{
		// draw rectangle
		if (source.rectArray.length < 4)
		{
			var tmp = 'region_'+(source.rectArray.length-1).toString();
			source.select = true;
			var newRect = {startX:source.mouseX,startY:source.mouseY,w:0,h:0,color:'black',regionName:tmp};
			//source.regionName(newRect.regionName);
			source.rectArray.push(newRect);
			source.index = source.rectArray.length - 1;
		}
		else{
			alert("our device only support four regions");
		}
	}    
	

}

videoComponentViewModel.prototype.checkInRectangle = function (p1, p2) {
       
	if(p1>this.rectArray[this.index].startX && p1<this.rectArray[this.index].startX+this.rectArray[this.index].w 
		&& p2>this.rectArray[this.index].startY && p2<this.rectArray[this.index].startY+this.rectArray[this.index].h)
	{
		return true;
	}

	for (i=0; i<this.rectArray.length; i++)
	{
		if(p1>this.rectArray[i].startX && p1<this.rectArray[i].startX+this.rectArray[i].w 
			&& p2>this.rectArray[i].startY && p2<this.rectArray[i].startY+this.rectArray[i].h)
		{
			this.index = i;
			return true;
		}
	}
   
	return false;
}

videoComponentViewModel.prototype.checkCloseEnough = function (p1, p2) {
	for (i=0; i<this.rectArray.length; i++)
	{
		if (Math.abs(p1 - this.rectArray[i].startX) < this.closeEnough && Math.abs(p2 - this.rectArray[i].startY) < this.closeEnough) {
			this.dragTL = true;
			this.index = i;
			return true;
		} else if (Math.abs(p1 - (this.rectArray[i].startX+this.rectArray[i].w)) < this.closeEnough && Math.abs(p2 - this.rectArray[i].startY) < this.closeEnough) {
			this.dragTR = true;
			this.index = i;
			return true;
		} else if (Math.abs(p1 - this.rectArray[i].startX) < this.closeEnough && Math.abs(p2 - (this.rectArray[i].startY+this.rectArray[i].h)) < this.closeEnough) {
			this.dragBL = true;
			this.index = i;
			return true;
		} else if (Math.abs(p1 - (this.rectArray[i].startX+this.rectArray[i].w)) < this.closeEnough && Math.abs(p2 - (this.rectArray[i].startY+this.rectArray[i].h)) < this.closeEnough) {
			this.dragBR = true;
			this.index = i;
			return true;
		}
	}
	return false;
}
	
videoComponentViewModel.prototype.mouseMove = function (e,source) {
	 if (source.dragTL || source.dragTR || source.dragBL || source.dragBR || source.drag|| source.select)
	{
		//source.mouseX = e.pageX - source.canvas.offsetParent.offsetLeft;
		//source.mouseY = e.pageY - source.canvas.offsetParent.offsetTop;
		source.mouseX = e.offsetX;
		source.mouseY = e.offsetY;
		var preRect = source.rectArray[source.index];
		if (source.dragTL) {
			if (source.mouseX <= preRect.startX+source.rectArray[source.index].w && source.mouseY <= preRect.startY+source.rectArray[source.index].h){
				source.rectArray[source.index].w += source.rectArray[source.index].startX - source.mouseX;
				source.rectArray[source.index].h += source.rectArray[source.index].startY - source.mouseY;
				source.rectArray[source.index].startX = source.mouseX;
				source.rectArray[source.index].startY = source.mouseY;
			}else{
				source.rectArray[source.index].startX = source.mouseX;
				source.rectArray[source.index].startY = source.mouseY;
				source.rectArray[source.index].w = 10;
				source.rectArray[source.index].h = 10;
			}
		} else if (source.dragTR) {
			if (source.mouseX >= preRect.startX && source.mouseY <= preRect.startY+source.rectArray[source.index].h){
				source.rectArray[source.index].w = Math.abs(source.rectArray[source.index].startX - source.mouseX);
				source.rectArray[source.index].h += source.rectArray[source.index].startY - source.mouseY;
				source.rectArray[source.index].startY = source.mouseY;
			}else{
				source.rectArray[source.index].startX = source.mouseX;
				source.rectArray[source.index].startY = source.mouseY;
				source.rectArray[source.index].w = 10;
				source.rectArray[source.index].h = 10;
			}
		} else if (source.dragBL) {
			if (source.mouseX <= preRect.startX+source.rectArray[source.index].w && source.mouseY >= preRect.startY){
				source.rectArray[source.index].w += source.rectArray[source.index].startX - source.mouseX;
				source.rectArray[source.index].h = Math.abs(source.rectArray[source.index].startY - source.mouseY);
				source.rectArray[source.index].startX = source.mouseX;
			}else{
				source.rectArray[source.index].startX = source.mouseX;
				source.rectArray[source.index].startY = source.mouseY;
				source.rectArray[source.index].w = 10;
				source.rectArray[source.index].h = 10;
			}
		} else if (source.dragBR) {
			if (source.mouseX >= preRect.startX && source.mouseY >= preRect.startY){
				source.rectArray[source.index].w = Math.abs(source.rectArray[source.index].startX - source.mouseX);
				source.rectArray[source.index].h = Math.abs(source.rectArray[source.index].startY - source.mouseY);
			}else{
				source.rectArray[source.index].startX = source.mouseX;
				source.rectArray[source.index].startY = source.mouseY;
				source.rectArray[source.index].w = 10;
				source.rectArray[source.index].h = 10;
			}
		}
		else if (source.drag) {
				source.rectArray[source.index].color = 'red';
				source.rectArray[source.index].startX = source.mouseX-source.posiX;
				source.rectArray[source.index].startY = source.mouseY-source.posiY;
				
		} else if (source.select) {
			source.rectArray[source.index].w = source.mouseX - source.rectArray[source.index].startX;
			source.rectArray[source.index].h = source.mouseY - source.rectArray[source.index].startY;
			//console.log("mouse move:mouseX-%d, mouseY-%d",source.mouseX, source.mouseY);
			//console.log("mouse move:w-%d, h-%d",source.rectArray[source.index].w, source.rectArray[source.index].h);
		}
	
		source.ctx.clearRect(0, 0, source.canvas.width, source.canvas.height);
		source.draw();
	}
}

videoComponentViewModel.prototype.mouseUp = function (e,source) {
	console.log("single mouse up!!!!!!!!!!!");
	source.select = source.drag = source.dragTL = source.dragTR = source.dragBL = source.dragBR = false;
	document.body.style.cursor = 'default';
	source.drawHandles(source.rectArray[source.rectArray.length-1]);
	for (i=0; i< source.rectArray.length; i++)
	{
		if (source.rectArray[i].color == 'red')
		{
			source.rectArray[i].color= 'black';
			source.draw(source.rectArray[i]);
			source.drawHandles(source.rectArray[i]);
		}
		if (source.rectArray[i].w < 0)
		{
			source.rectArray[i].startX += source.rectArray[i].w;
			source.rectArray[i].w = Math.abs(source.rectArray[i].w);
		}
		if (source.rectArray[i].h < 0)
		{
			source.rectArray[i].startY += source.rectArray[i].h;
			source.rectArray[i].h = Math.abs(source.rectArray[i].h);
		}
	}
}

videoComponentViewModel.prototype.draw = function (rect) {
	// this.ctx.fillStyle = this.color._latestValue;
	if (rect == undefined)
	{
		for (i=0; i<this.rectArray.length; i++)
		{
			this.ctx.fillStyle = this.rectArray[i].color;
			this.ctx.fillRect(this.rectArray[i].startX, this.rectArray[i].startY, this.rectArray[i].w, this.rectArray[i].h);
			this.drawHandles(this.rectArray[i]);
		}
	}
	else{
		this.ctx.fillStyle = rect.color;
		this.ctx.fillRect(rect.startX, rect.startY, rect.w, rect.h);
	}
	//this.drawHandles(rect);
}

videoComponentViewModel.prototype.drawCircle = function (x, y, radius) {
	this.ctx.fillStyle = "#FF0000";
	this.ctx.beginPath();
	this.ctx.arc(x, y, radius, 0, 2 * Math.PI);
	this.ctx.fill();
	this.ctx.fillStyle = this.color._latestValue;
}

videoComponentViewModel.prototype.drawHandles = function (rect) {
	this.drawCircle(rect.startX, rect.startY, this.closeEnough);
	this.drawCircle(rect.startX + rect.w, rect.startY, this.closeEnough);
	this.drawCircle(rect.startX + rect.w, rect.startY + rect.h, this.closeEnough);
	this.drawCircle(rect.startX, rect.startY + rect.h, this.closeEnough);
}
   

