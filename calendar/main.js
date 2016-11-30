
window.Calendar = {
	//Lấy ngày hôm nay
	GetToday : function(){
		var today = new Date();

		return today; 	
	},

	//Lấy số ngày trong tháng

	GetSimpleDays: function(y,m){
		var day = [];
		var tmp = new Date(y,m,01);
		//xét xem mùng 1 vào thứ mấy
		var arr =[];
		while(tmp.getMonth()==m){
			arr.push(tmp.getDate());
			tmp.setDate(tmp.getDate()+1);
		}
		return arr;
	},

	//Lấy ra số ngày đẻ show
	GetDays:function(y,m){
		var tmp = new Date(y,m,01);
		//Lấy ra số ngày trong tháng
		var tmpDays = Calendar.GetSimpleDays(y,m); 
		var leng = tmpDays.length;
		//lấy ra ngày đầu ngày cuối là thứ mấy
		var firstDay = tmp.getDay();
		var last = leng-1;
		tmp.setDate(tmpDays[last]);
		var lastDay = tmp.getDay();

		switch(m){
			case 0:{
				var prevMonth = Calendar.GetSimpleDays(y-1,11);
				var nextMonth = Calendar.GetSimpleDays(y,m+1);
				break;
			}
			case 11:{
				var prevMonth = Calendar.GetSimpleDays(y,m-1);
				var nextMonth = Calendar.GetSimpleDays(y+1,0);
				break;
			}
			default: {
				var prevMonth = Calendar.GetSimpleDays(y,m-1);
				var nextMonth = Calendar.GetSimpleDays(y,m+1);
				break;
			}
		}
		

		var days = [];
		//them vao cac ngay cua thang truoc
		for(var i=prevMonth.length-firstDay ;i < prevMonth.length ;i++){
			days.push(prevMonth[i]);
		}
		//them vao cac ngay cua thang nay
		for(var i=0;i< tmpDays.length ;i++){
			days.push(tmpDays[i]);
		}
		//them vao cac ngay cua thang sau
		for(var i=0;i<(6-lastDay);i++){
			days.push(nextMonth[i]);
		}
		var tmpArr = new Array();
		tmpArr[0] = days;
		tmpArr[1] = firstDay;
		tmpArr[2] = lastDay;
		return tmpArr;	
	},

	//Show
	ShowInfo(y,m,d,first,last){
		var today = new Date();
		var thisDay = today.getDate();
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var month = [
			"january",
			"february",
			"march",
			"april",
			'may',
			'june',
			'july',
			'august',
			'september',
			'october',
			'november',
			'december'
		];
		console.log(first);
		console.log(last);
		var info = "<p id='head' month='";
		info+=m;
		info+="' year='";
		info+=y+"' >";
		info+=month[m]+ " "+y+"</p>";
		document.getElementById('month').innerHTML = info;
		var text = '';
		var jang = 0;
		for(var i =0;i<d.length;i++){
			if(i<first || i>d.length-(6-last)-1){
				switch(jang){
					case 0 : {
						text+="<tr><td><p class='wait' id='p";
						text+=i+"'>";
						text+=d[i];
						text+="</p></td>";
						jang++; 
						break;
					}
					case d.length-1:{
						text+="<td<p class='wat' id='p";
						text+=i+"'>";
						text+=d[i];
						text+="</p></td></tr>";
						jang=0;
						break;
					}
					case 6:{
						text+="<td><p class='wait' id='p";
						text+=i+"'>";
						text+=d[i];
						text+="</p></td></tr>";
						jang=0;
						break;
					}
					default :{
						text+="<td><p class='wait' id='p";
						text+=i+"'>";

						text+=d[i];
						text+="</p></td>";
						jang++;
						break;
					}
				}
			}
			else{
				switch(jang){
					case 0 : {
						text+="<tr><td><p id='p";
						text+=i+"'>";
						text+=d[i];
						text+="</p></td>";
						jang++; 
						break;
					}
					case d.length-1:{
						text+="<td><p id='p";
						text+=i+"'>";

						text+=d[i];
						text+="</p></td></tr>";
						jang=0;
						break;
					}
					case 6:{
						text+="<td><p id='p";
						text+=i+"'>";

						text+=d[i];
						text+="</p></td></tr>";
						jang=0;
						break;
					}
					default :{
						text+="<td><p id='p";
						text+=i+"'>";

						text+=d[i];
						text+="</p></td>";
						jang++;
						break;
					}
				}
			}
		}
		//console.log(text);
		document.getElementById('tbody').innerHTML = text;
		for(var i =0; i<d.length;i++){
			if(i>=first && i<=d.length-last){
				var tmp = "p"+i;
				if(document.getElementById(tmp).textContent == thisDay
				 && document.getElementById('head').getAttribute('month') == thisMonth
				 && document.getElementById('head').getAttribute('year') == thisYear)
					{
					document.getElementById(tmp).setAttribute("class", "today");
					break;
				}
			}
		}
	},

}