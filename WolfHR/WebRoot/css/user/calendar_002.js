/*��������*/
var Frw = 150; //�������
var Frh = 137; //�����߶�
var Frs = 4;   //Ӱ�Ӵ�С
var Hid = true;//�����Ƿ��

/*�������*/
document.writeln('<Div id=Calendar scrolling="no" style="border:0px solid #EEEEEE ;position: absolute; width: '+Frw+'; height: '+Frh+'; z-index: 200; filter :\'progid:DXImageTransform.Microsoft.Shadow(direction=135,color=#AAAAAA,strength='+Frs+')\' ;display: none"></Div>');

/*ȡ�ý�������*/
function GetTodayDate() {
	var today = new Date();
	var year = today.getYear();
	if(year < 1900) year += 1900;
	var month = today.getMonth() + 1;
	if (month < 10) month = '0' + month;
	var day = today.getDate();
	if ( day < 10) day = '0' + day;
	return year + '-' + month + '-' + day;
}

/*�����������*/
function SetTodayDate(InputBox)  {
	HiddenCalendar();
	InputBox.value = GetTodayDate();
	//���Զ���ƽ̨��ؼ���׷�Ӵ�����ʾ�Զ����ʽ
	if (InputBox.getAttribute("showStyle")) {
		dateFamate(InputBox);
	}
}

/*ȡĳ��ĳ�µ�һ�������ֵ(�·�-1)*/
function GetFirstWeek(The_Year,The_Month) {
	return (new Date(The_Year, The_Month-1, 1)).getDay();
}

/*ȡĳ��ĳ����������*/
function GetThisDays(The_Year, The_Month) {
	return (new Date(The_Year, The_Month, 0)).getDate();
}

/*ȡĳ��ĳ���ϸ�����������*/
function GetLastDays(The_Year, The_Month) {
	return (new Date(The_Year, The_Month-1, 0)).getDate()
}

/*�ж��Ƿ�������*/
function RunNian(The_Year) {
	if ((The_Year%400 == 0) || ((The_Year%4 == 0) && (The_Year % 100 != 0)))
		return true;
	return false;
}

/* �ж�����(YYYY-MM-DD)�������Ƿ���ȷ */
function DateIsTrue(srcObj) {
	 var inputValue = srcObj.value;
	 if (inputValue == "") return true;
	 var lsDate  = inputValue;
	 var loDate  = lsDate.split("-");
	 if (loDate.length != 3) return false;
	 var liYear  = parseInt(loDate[0]);
	 var liMonth = parseFloat(loDate[1]);
	 var liDay   = parseInt(loDate[2]);
	 if ((loDate[0].length > 4) || (loDate[1].length > 2)|| (loDate[2].length > 2)) return false;
	 if (isNaN(liYear) || isNaN(liMonth) || isNaN(liDay)) return false;
	 if ((liYear < 1800) || (liYear > 2500)) return false;
	 if ((liMonth > 12) || (liMonth <= 0))   return false;
	 if (GetThisDays(liYear, liMonth) < liDay) return false;
	 return !isNaN(Date.UTC(liYear, liMonth, liDay));
}

//����� onBlur
function TextOnBlur(srcObj) {
	if (!DateIsTrue(srcObj)) {
	 	srcObj.focus();
	 	srcObj.select();
	 	alert(dateErr);
	 	setTimeout(function() { srcObj.focus(); srcObj.select(); }, 0);
	}
}

/*ȡĳ��ĳ�µ���ֵ*/
function GetCountWeeks(The_Year, The_Month) {
	var Allday;
	Allday = 0;
	if (The_Year > 2000) {
		for (i=2000 ;i < The_Year; i++) 
		if (RunNian(i)) 
			Allday += 366;
		else
			Allday += 365;
		for (i = 2; i <= The_Month; i++) {
			switch (i) {
				case 2 : 
					Allday += 28;
					if (RunNian(The_Year)) Allday += 1;
					break;
				case 3  : Allday += 31; break;
				case 4  : Allday += 30; break;
				case 5  : Allday += 31; break;
				case 6  : Allday += 30; break;
				case 7  : Allday += 31; break;
				case 8  : Allday += 31; break;
				case 9  : Allday += 30; break;
				case 10 : Allday += 31; break;
				case 11 : Allday += 30; break;
				case 12 : Allday += 31; break;
			}
		}
	}
	return (Allday + 6) % 7;
}

/*�������ʾ*/
function InputValue(InputBox, Year, Month, Day) {
	if (Month < 10) Month = '0' + Month;
	if (Day < 10) Day = '0' + Day;
	InputBox.value = Year + "-" + Month + "-" + Day;
	//���Զ���ƽ̨��ؼ���׷�Ӵ�����ʾ�Զ����ʽ
	if (InputBox.getAttribute("showStyle")) {
		dateFamate(InputBox);
	}
}

//��һ��
function ForwardMonth(InputBox, Year, Month, Day) {
    Month = Month - 1;
    if (Month < 1) {
        Month = 12;
        Year = Year - 1;
        if (Year < 1800) Year = 2500;
	}
	Day = ((GetThisDays(Year, Month) < Day) ? GetThisDays(Year, Month) : Day);
	Hid = false;
	ShowCalendar(InputBox, Year, Month, Day); 
}

//��һ��
function NextMonth(InputBox, Year, Month, Day) {
    Month = Month + 1;
    if (Month > 12) {
        Month = 1;
        Year = Year + 1;
        if (Year > 2500) Year = 1800;
    }
	Day = ((GetThisDays(Year, Month) < Day) ? GetThisDays(Year, Month) : Day);
	Hid = false;
	ShowCalendar(InputBox, Year, Month, Day); 
}

//��һ��
function ForwardYear(InputBox, Year, Month, Day) {
    Year = Year - 1;
    if (Year < 1800) Year = 2500;
	Day = ((GetThisDays(Year, Month) < Day) ? GetThisDays(Year, Month) : Day);
	Hid = false;
	ShowCalendar(InputBox, Year, Month, Day); 
}

//��һ��
function NextYear(InputBox, Year, Month, Day) {
    Year = Year + 1;
    if (Year > 2500) Year=1800;
	Day = ((GetThisDays(Year, Month) < Day) ? GetThisDays(Year, Month) : Day);
	Hid = false;
	ShowCalendar(InputBox, Year, Month, Day); 
}

/*�����¼���ʾ����*/
function OpenDate(where) {	
 	GetCalendar(where);
 	cal_hideElementAll(document.getElementById("Calendar"));
}

/*����������е�������ʾ����*/
function GetCalendar(where) {
    Hid = false;
    var Box_Name = where.name;
    var Box_value = where.value;
	if (Box_value != "" && DateIsTrue(where)) {
		var loDate = Box_value.split("-");
		var Year = parseFloat(loDate[0]);
		var Month = parseFloat(loDate[1]);
		var Day = parseFloat(loDate[2]);
		ShowCalendar(where, Year, Month, Day);
    } else {
		var today = new Date();
		var year = today.getYear();
		if(year < 1900) year += 1900;
		var month = (today.getMonth() + 1);
		var day = today.getDate();
		ShowCalendar(where, year, month, day);
	}
}

/*��������*/
function HiddenCalendar() {	
	document.getElementById("Calendar").style.display = "none";
	cal_ShowElement();
}

function CloseCalendar() {
	if (Hid) {
		cal_ShowElement();
		document.getElementById("Calendar").style.display="none";
	}
	Hid = true;
}

/*��ʾ����*/
function ShowCalendar(InputBox, The_Year, The_Month, The_Day) {
    var Now_Year = (The_Year == null ? 2004 : The_Year);
    var Now_Month = (The_Month == null ? 1 : The_Month);
    var Now_Day = (The_Day == null ? 1 : The_Day);
    var Box_Name = 'document.all.' + InputBox.name;
    var fw = GetFirstWeek(Now_Year, Now_Month);
    var ld = GetLastDays(Now_Year, Now_Month);
    var td = GetThisDays(Now_Year, Now_Month);
    var isnd = false; //�Ƿ����¸��µ�����
    var d = 1,w = 1;
    var FrameContent;
    /*��ʾ��λ��*/
	Winw = document.body.offsetWidth;
	Winh = document.body.offsetHeight;
	y1 = document.body.scrollTop;
	x = InputBox.getBoundingClientRect().left - 2;
	y = InputBox.getBoundingClientRect().bottom + y1;
	if (((x + Frw + Frs) > Winw) && ((Frw + Frs) < Winw)) {
  		x = Winw - Frw - Frs;
  	}
  //ʱ��ؼ���������һ����������λ�ô���  2012-03-12 �����޸�
	//if (((y1 + Winh + Frh + Frs) > 2 * Winh) && ((Frh + Frs) < Winh)) {
  //		y = 2 * (Winh - Frh - Frs);
	//}
	var calendarObj = document.getElementById("Calendar");
	calendarObj.style.display = "";
	calendarObj.style.left = x;
	calendarObj.style.top = y;
	
	//��ʾ��������
	FrameContent = "<table border='0' cellpadding='0' cellspacing='0' bgcolor='#FFFBD1' width='100%' height='15' style='font-weight:bolder;border:0px solid;'>";
	FrameContent += "<tr>";
	FrameContent += "<td width=8 title=" + lastyear + " style='background-color: #FFFBD1;font-weight: bold;font-family: ����;font-size: 9pt;'>";
	FrameContent += "<font size=0 style='cursor:pointer;' onclick='ForwardYear (document.all." + InputBox.name + ", " + Now_Year+ "," + Now_Month + ", " + Now_Day + ")'>&lt;&lt;</font>";
	FrameContent += "</td>";
	FrameContent += "<td vAlign=middle align='center'>";
	FrameContent += Now_Year + "" + year + "";
	FrameContent += "</td>";
	FrameContent += "<td width=8 title=" + nextyear + ">";
	FrameContent += "<font size=0 style='cursor:pointer' onclick='NextYear (document.all." + InputBox.name + ", " + Now_Year + "," + Now_Month + ", " + Now_Day + ")'>&gt;&gt;</font>";
	FrameContent += "</td>";
	FrameContent += "<td width=8 title=" + lastmonth + ">";
	FrameContent += "<font size=0 style='cursor:pointer' onclick='ForwardMonth (document.all." + InputBox.name + ", " + Now_Year + ", " + Now_Month + ", " + Now_Day + ")'>&lt;&lt;</font>";
	FrameContent += "</td>";
	FrameContent += "<td vAlign=middle align='center' width='16'>";
	FrameContent += Now_Month;
	FrameContent += "</td>";
	FrameContent += "<td vAlign=middle align='center' width='13'>";
	FrameContent += "" + month + "";
	FrameContent += "</td>";
	FrameContent += "<td width=8 title=" + nextmonth + ">";
	FrameContent += "<font size=0 style='cursor:pointer' onclick='NextMonth (document.all." + InputBox.name + ", " + Now_Year + "," + Now_Month + ", " + Now_Day + ")'>&gt;&gt;</font>";
	FrameContent += "</td>";
	FrameContent += "</tr>";
	FrameContent += "</table>";
	
	FrameContent += "<table onselectstart='return false;' border='1' cellpadding='1' cellspacing='1' width='100%' bgcolor='#B0B0FF' bordercolorlight='#184785' bordercolordark='#FFFFFF'>";
	FrameContent += "<tr style='background-color: #DBEAE8;font-family: ����;font-size: 10pt;cursor:pointer;'>";
	FrameContent += "<td><center>" + num1 + "</center></td>";
	FrameContent += "<td><center>" + num2 + "</center></td>";
	FrameContent += "<td><center>" + num3 + "</center></td>";
	FrameContent += "<td><center>" + num4 + "</center></td>";
	FrameContent += "<td><center>" + num5 + "</center></td>";
	FrameContent += "<td><center>" + num6 + "</center></td>";
	FrameContent += "<td><center><font color='#FF0000'>" + num7 + "</font></center></td>";
	FrameContent += "</tr>";

	//������µ�һ��������һ��������.Ӧ������.��֤���Կ����ϸ��µ�����
	if ( fw < 2)
		tf = fw + 7;
	else
		tf = fw;
	FrameContent += "<tr bgcolor='#B0B0FF'>";
	//��һ����������
	for (l = (ld - tf + 2); l <= ld; l++) {
		FrameContent += "<td onclick='ForwardMonth (document.all." + InputBox.name + ", " + Now_Year + ", " + Now_Month + ", " + l +")' style='cursor:pointer'><center><font color='#BBBBBB'>"+l+"</font></center></td>";
		w++;
	}
	//��һ�б�������
	for (f = tf; f <= 7; f++) {
		//�����쵫����������
		if (((w % 7) == 0) && (d != Now_Day)) {
			FrameContent += "<td onMouseOver=\"this.style.background=\'#B0B0FF\'\" onMouseOut=\"this.style.background=\'#B0B0FF\'\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\" style='cursor:pointer'><center><font color='#FF0000'>"+d+"</font></center></td>";
		//����Ϊ��������
        } else if (d == Now_Day) {
			FrameContent += "<td style=\"background:#B0B0FF;cursor:pointer\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\"><center><font color='#FFFFFF'>"+d+"</font></center></td>";
		//����
        } else {
           FrameContent += "<td onMouseOver=\"this.style.background=\'#B0B0FF\'\" onMouseOut=\"this.style.background=\'#B0B0FF\'\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\" style='cursor:pointer'><center>"+d+"</center></td>";
        }
        d++;
        w++;
	}
	FrameContent += "</tr>";
	w = 1;
	for (i = 2;i < 7; i++) {
		FrameContent += "<tr bgcolor='#B0B0FF'>";
		for (j = 1;j < 8; j++) {
			if (isnd) { //�¸��µ�����
				FrameContent += "<td style='cursor:pointer' onclick=\"NextMonth (document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+")\"><center><font color='#BBBBBB'>"+d+"</font></center></td>";
			} else { //���µ�����
				//�����쵫����������
				if (((w % 7) == 0) && (d != Now_Day)) {
					FrameContent += "<td onMouseOver=\"this.style.background=\'#B0B0FF\'\" onMouseOut=\"this.style.background=\'#B0B0FF\'\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\" style='cursor:pointer'><center><font color='#FF0000'>"+d+"</font></center></td>";
				} else if (d == Now_Day) { //����Ϊ��������
					FrameContent += "<td style=\"background:#420042;cursor:pointer\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\"><center><font color='#FFFFFF'>"+d+"</font></center></td>";
				} else { //����
		             FrameContent += "<td onMouseOver=\"this.style.background=\'#B0B0FF\'\" onMouseOut=\"this.style.background=\'#B0B0FF\'\" onClick=\"InputValue(document.all."+InputBox.name+","+Now_Year+","+Now_Month+","+d+");HiddenCalendar()\" style='cursor:pointer'><center>"+d+"</center></td>";
		        }
			}
			//�ж��Ƿ�Ϊ���µ�����
			if (d == td) {
				isnd = true;
				d = 0;
			}
			w++;
			d++;
		}
		FrameContent += "</tr>";
	}
	FrameContent += "</table>";

	FrameContent += "<table onselectstart='return false;' cellpadding='0' cellspacing='0' bgcolor='#F5F5F5' width='100%' height='15'>";
	FrameContent += "<tr>";
	FrameContent += "<td title='" + toThisDay + "" + GetTodayDate() + "' style='cursor:pointer' onclick='SetTodayDate(document.all." + InputBox.name + ")'>";
	FrameContent += "<font color=red>" + toThisDay + "</font>" + GetTodayDate();
	FrameContent += "</td>";
	FrameContent += "<td title=" + guanbi + ">";
	FrameContent += "<span style='cursor:pointer;' onclick='HiddenCalendar()'>" + cancelImg + "</span>";
	FrameContent += "</td>";
	FrameContent += "</tr>";
	FrameContent += "</table>";
	calendarObj.innerHTML = FrameContent;
	calendarObj.style.display = "";
}

/*��ʾ�����*/
function DateBox(sBoxName, sDfltValue) {
    if (sBoxName == null) sBoxName='Date_Box'
    if ((sDfltValue == null) || !(DateIsTrue(sDfltValue))) {
		sDfltValue= GetTodayDate();
    } else {
		DateStr = sDfltValue.split("-");
		y = parseFloat(DateStr[0]);
		M = (parseFloat(DateStr[1]) < 10) ? ('0' + parseFloat(DateStr[1])) : parseFloat(DateStr[1]);
		D = (parseFloat(DateStr[2]) < 10) ? ('0' + parseFloat(DateStr[2])) : parseFloat(DateStr[2]);
		sDfltValue = y + '-' + M + '-' + D;
    }
    document.write("<input size='10' readonly class='inputdate' name='"+sBoxName+"' value='"+sDfltValue+"' onclick='GetCalendar(document.all."+sBoxName+")' >");
}

var HideElementTemp = new Array();

//����˵�ʱ�����ô˵ĺ���,�˵�����
function cal_hideElementAll(obj){ 
	cal_HideElement("SELECT",obj);
	cal_HideElement("iframe",obj);
}

function cal_HideElement(strElementTagName,obj) {
	try {
		var showDivElement = obj;
		var calendarDiv = obj;
		var intDivLeft = cal_GetOffsetLeft(showDivElement);
		var intDivTop = cal_GetOffsetTop(showDivElement);	//+showDivElement.offsetHeight;

		var strElementTagNameAry = document.getElementsByTagName(strElementTagName);
		for(var i = 0; i < strElementTagNameAry.length; i++) {
			var objTemp = strElementTagNameAry[i];
			if(!objTemp || !objTemp.offsetParent) continue;
			var intObjTop = cal_GetOffsetTop(objTemp);
			var intObjLeft = cal_GetOffsetLeft(objTemp);
			if((intObjTop + objTemp.clientHeight) <= intDivTop) continue;
			if((intObjLeft + objTemp.clientWidth) <= intDivLeft) continue;
			if(intObjLeft >= (intDivLeft + calendarDiv.style.posWidth)) continue;
			if(intObjTop >= (intDivTop + calendarDiv.style.posHeight + showDivElement.offsetHeight)) continue;
			HideElementTemp[HideElementTemp.length] = objTemp;
			objTemp.style.visibility = "hidden";
		}
	} catch(e){}
}

function cal_ShowElement(){
    for(var i = 0; i< HideElementTemp.length; i++){
		 var objTemp = HideElementTemp[i]
		 if(!objTemp || !objTemp.offsetParent) continue;
		 objTemp.style.visibility = '';
    }
    HideElementTemp = new Array();
}

function cal_GetOffsetLeft(src){
    var set=0;
    if(src && src.name!="divMain"){
		if (src.offsetParent){
			set+=src.offsetLeft+cal_GetOffsetLeft(src.offsetParent);
		}
		if(src.tagName.toUpperCase()!="BODY"){
			var x=parseInt(src.scrollLeft,10);
			if(!isNaN(x)) set-=x;
		}
    }
    return set;
}

function cal_GetOffsetTop(src){
    var set = 0;
	if(src && src.name != "divMain"){
		if (src.offsetParent){
			set+=src.offsetTop+cal_GetOffsetTop(src.offsetParent);
		}
		if(src.tagName.toUpperCase()!="BODY"){
			var y = parseInt(src.scrollTop,10);
			if(!isNaN(y)) set-=y;
		}
    }
    return set;
}

document.onclick = CloseCalendar;

//���·��������ڵ���չ
var now = new Date();                    //��ǰ����       
var nowDayOfWeek = now.getDay();         //���챾�ܵĵڼ���       
var nowDay = now.getDate();              //��ǰ��       
var nowMonth = now.getMonth();           //��ǰ��       
var nowYear = now.getYear();             //��ǰ��       
nowYear += (nowYear < 2000) ? 1900 : 0;
      
//��ʽ�����ڣ�yyyy-MM-dd       
function formatDate(date) {
   if (date==undefined) return "";       
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;       
    var myweekday = date.getDate();
    if(mymonth < 10) mymonth = "0" + mymonth;
    if(myweekday < 10) myweekday = "0" + myweekday;
    return (myyear + "-" + mymonth + "-" + myweekday);
}

//ȡ�ý����·� YYYYMM
function getTodayMonth() {
	var today = new Date();
	var year = today.getYear();
	var month = (today.getMonth() + 1);
	if(month < 10) month = '0' + month;
	return year + '' + month;
}

//ȡ�ý��ռ��� YYYYQ(1234)
function getTodayQuarter() {
	var today = new Date();
	var year = today.getYear();
	var quarter = Math.ceil(today.getMonth()/3);
	//20120111 zhangyi ��1���ȵļ����д���
	if(quarter==0) quarter=1;
	return year + 'Q' + quarter;
}
      
//���ĳ�µ�����
function getMonthDays(myMonth) {
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
}
      
//��ñ����ȵĿ�ʼ�·�       
function getQuarterStartMonth(){       
    var quarterStartMonth = 0;       
    if(nowMonth<3){       
        quarterStartMonth = 0;
     }       
    if(2<nowMonth && nowMonth<6){       
        quarterStartMonth = 3;       
     }       
    if(5<nowMonth && nowMonth<9){       
        quarterStartMonth = 6;       
     }       
    if(nowMonth>8){       
        quarterStartMonth = 9;       
     }       
    return quarterStartMonth;       
}
      
//��ñ��ܵĿ�ʼ����       
function getWeekStartDate() {
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);        
    return formatDate(weekStartDate);       
}
      
//��ñ��ܵĽ�������       
function getWeekEndDate() {        
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));        
    return formatDate(weekEndDate);       
}
      
//��ñ��µĿ�ʼ����       
function getMonthStartDate(){       
    var monthStartDate = new Date(nowYear, nowMonth, 1);        
    return formatDate(monthStartDate);       
}       
      
//��ñ��µĽ�������       
function getMonthEndDate(){       
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));        
    return formatDate(monthEndDate);       
}       
      
//��ñ����ȵĿ�ʼ����       
function getQuarterStartDate(){       
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);        
    return formatDate(quarterStartDate);       
}       
      
//��ñ����ȵĽ�������       
function getQuarterEndDate(){       
    var quarterEndMonth = getQuarterStartMonth() + 2;       
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));        
    return formatDate(quarterStartDate);       
}

//��ñ���Ŀ�ʼ����       
function getYearStartDate(){       
    var yearStartDate = new Date(nowYear, 0, 1);
    return formatDate(yearStartDate);
}

//��ñ���Ľ�������       
function getYearEndDate(){       
    var yearEndDate = new Date(nowYear, 11, 31);
    return formatDate(yearEndDate);
}

//��ü��������
//calDate : ����������
//addYear �����ӵ�����
//addMonth �����ӵ�����
//addDay �����ӵ�����
function getCalDate(calDate, addYear, addMonth, addDay) {
	var useDate = calDate ? calDate : new Date();
	var year = useDate.getYear();           //���
	if (year < 1900) year += 1900;
	if (addYear) year += addYear;
	var month = useDate.getMonth();         //�·�
	if (addMonth) month += addMonth;
	var day = useDate.getDate();          	//����
	if (addDay) day += addDay;
    var calDate = new Date(year, month, day);
    return formatDate(calDate);
}

//��ü�����·�
//calDate : ����������
//addYear �����ӵ�����
//addMonth �����ӵ�����
function getCalMonth(calDate, addYear, addMonth) {
	var useDate = calDate ? calDate : new Date();
	var year = useDate.getYear();           //���
	if (year < 1900) year += 1900;
	if (addYear) year += addYear;
	var month = useDate.getMonth();         //�·�
	if (addMonth) month += addMonth;
	//����������
    var calDate = new Date(year, month, 1);
    var calYear = calDate.getYear();           //���
	if (calYear < 1900) calYear += 1900;
	var calMonth = calDate.getMonth() + 1;     //�·�
    if(calMonth < 10) calMonth = "0" + calMonth;
	return calYear + '' + calMonth;
}
