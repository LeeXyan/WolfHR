
function document.onreadystatechange()
{
if (document.readyState=="complete") {
	  var t=document.getElementById("userId"); 
      var obj = document.getElementsByName("sysOa");
	  for(var i = 0;i<obj.length;i++) {
		  if(obj[i].checked) {
			  if(obj[i].value == '1') {
                  t.readOnly = false;
				  var userAccount = document.getElementsByName("userAccount")[0].value;
				  if(userAccount != 'null') {
					  t.value = userAccount;
					  t.readOnly = true;
				  }
                  else t.value = '';  
			  }
			  else { t.readOnly = true; t.value="������OA�ʺ�"; }
		  }
	  }
 
  }
}


function changeText(obj){
	//alert(1234);
	var t=document.getElementById("userId"); 
	var value = obj.value;
	if(value == '1') {
        var userAccount = document.getElementsByName("userAccount")[0].value;
		//alert(userAccount);
         if(userAccount != 'null' && userAccount !='') {
					  t.value = userAccount;
					  t.readOnly = true;
		} else {
	    t.readOnly = false;
		t.value = "";
		}
	}
	if(value == '0') {
        t.readOnly = true;
		t.value="������OA�ʺ�"; 
	}

  } 
  
  document.onreadystatechange = function(){ 
����  if(/msie/i.test(navigator.userAgent)) { 
	   //IE���
      if(document.getElementsByName('probationership')[0] != null)
         document.getElementsByName('probationership')[0].onpropertychange = conutValue;

     }
     else 
     {
	   //��ie�����������Firefox 
       document.getElementsByName('probationership')[0].addEventListener("input", conutValue, false); 
       document.getElementsByName('probationership')[0].watch('a', fn); 
     }
}



//��״̬�ı��ʱ��ִ�еĺ��� 
function conutValue() {   
		var startStr = document.getElementsByName('probationership')[0].value;
		var startDate = new Date(Date.parse(startStr.replace(/-/g,   "/"))); 
		var endDate = new Date();
		var week = (endDate.getFullYear() - startDate.getFullYear());
		if(week < 0) week = 0;
	//	document.getElementsByName('work')[0].value = week; 
	//	document.all.divDay.innerText = week;
} 
