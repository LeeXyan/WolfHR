var num1 = "һ";
var num2 = "��";
var num3 = "��";
var num4 = "��";
var num5 = "��";
var num6 = "��";
var num7 = "��";
var toThisDay = "����:";
var year = "��";
var month = "��";
var dateErr = "�����������\n��ȷ�ĸ�ʽΪ(YYYY-MM-DD)";
var guanbi = "�ر�";
var lastyear = "ǰһ��";
var nextyear = "��һ��";
var lastmonth = "�ϸ���";
var nextmonth = "�¸���";

function formatMonth(monthValue) {
//	var months = new Array("һ��", "����", "����", "����", "����", "����", "����", "����", "����", "ʮ��", "ʮһ��", "ʮ����");
	var months = new Array("Ҽ��", "����", "����", "����", "����", "½��", "����", "����", "����", "ʰ��", "ʰҼ��", "ʰ����");
	return months[monthValue - 1];
}
