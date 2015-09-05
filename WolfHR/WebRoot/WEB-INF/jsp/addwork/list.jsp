<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<html>
	<head>
		<title>加班历史</title>
		<jsp:include page="commonwork.jsp"></jsp:include>
		

	</head>
	<body topmargin="0" leftmargin="0" onload="onLoad()" marginheight="0"
		marginwidth="0">

			<div id="Title_bar">
				<div id="Title_bar_Head">
					<div id="Title_Head"></div>

					<div id="Title">
						<img src="css/work/title_arrow.gif" border="0" height="13" width="13">
						加班历史详情
					</div>

					<div id="Title_End"></div>

					<div id="Title_bar_bg"></div>
				</div>

				<div id="Title_bar_Tail">
					<div id="Title_FuncBar">
						<ul>
							<li class="line"></li>
							<li class="title">

								<div onclick="javascript:history.go(-1);" class="Btn">
									返回
								</div>

							</li>
							<li class="line"></li>
							<li class="title">
								<form name="form"></form>
								<div onclick="sub();" class="Btn">
									提出异议
								</div>

							</li>
							<li class="line"></li>
						</ul>
					</div>
				</div>
			</div>

			<div id="MainArea">



				<table class="TableStyle" cellpadding="0" cellspacing="0" border="0"
					width="100%">
					<tbody>
						<tr id="TableTitle" align="center" valign="middle">
							<td >
								加班日期
							</td>
							<td >
								开始时间
							</td>
							<td >
								结束时间
							</td>
							<td >
								加班时长<font color="red">(小时)</font>
							</td>
							<td>
								工作内容
							</td>
							<td>
								审批状态
							</td>
						</tr>

					</tbody>
					<tbody id="TableData">

						<s:iterator value="#addWorkingList">
							<tr class="TableDetail1 template">
								<td align="center">
									<s:property value="startDate" />
								</td>
								<td align="center">
									<s:property value="startTime" />
								</td>
								<td align="center">
									<s:property value="endTime" />
								</td>
								<td align="center">
									<s:property value="hours" />
								</td >
								<td align="center"> 
									<s:property value="content" />
								</td>
								<td align="center"> 
									<c:choose>
										<c:when test="${agree==0}">
										
											<font color="blue">	未审核</font>
										</c:when>
										<c:when test="${agree==1}">
										
											<font color="#99FF33">已通过</font>
										</c:when>
										<c:otherwise>
											<font color="red">未通过</font>
										</c:otherwise>
									</c:choose>
									
								</td>
							</tr>
						</s:iterator>
					</tbody>
				</table>


				<div id="TableTail">
					<div id="TableTail_inside">
						<table cellpadding="0" cellspacing="0" border="0" height="100%">
							<tbody>
								<tr valign="bottom">
									<td colspan="3"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

			</div>
	</body>
</html>