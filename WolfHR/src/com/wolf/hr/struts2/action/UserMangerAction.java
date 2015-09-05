package com.wolf.hr.struts2.action;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.BeanUtils;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

import com.opensymphony.xwork2.ActionContext;
import com.wolf.hr.domain.User;
import com.wolf.hr.domain.UserManger;

import com.wolf.hr.service.UserMangerService;
import com.wolf.hr.service.UserService;
import com.wolf.hr.struts2.action.base.BaseAction;
import com.wolf.hr.utils.DeleteMode;


@Controller("usermangerAction")
@Scope("prototype")
public class UserMangerAction extends BaseAction<UserManger>{
	
	@Resource(name="usermangerService")
	private UserMangerService usermangerService;
	
	@Resource(name="userService")
	private UserService userService;
	
	private Long uid;
	
	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public String getAllUserManger(){
		
	    List<User> userlist =new ArrayList<User>();
		List<UserManger> usermangerlist =new ArrayList<UserManger>();
		  for(UserManger usermanger: this.usermangerService.getAllUserManger())
		  {
			  User user=usermanger.getUser();
			  if(user!=null)
			  {
				    userlist.add(user);
				    ActionContext.getContext().put("userlist",userlist);
				    ActionContext.getContext().put("usermanger",usermanger);
			  }
			  
			  
		  }
		return listAction;
	}
	
	public String deleteUserManger(){
		this.usermangerService.deleteUserMangerByID(this.getModel().getUmid(), DeleteMode.DEL_PRE_RELEASE);
		return action2action;
	}
	
	public String addUI(){
		
		Collection<User> userList = this.userService.getAllUser();
		ActionContext.getContext().put("userList", userList);
		return addUI;
	}
	
	public String add(){
		/**
		 * 1、新建一个UserEdu
		 * 2、把模型驱动中的值赋值到UserEdu中
		 * 3、执行save方法保存
		 */
		UserManger usermanger = new UserManger();
		/**
		 * 对象的属性的赋值的过程
		 */
		BeanUtils.copyProperties(this.getModel(), usermanger);
		User users = this.userService.getUserById(this.uid);
		usermanger.setUser(users);
		this.usermangerService.saveUserManger(usermanger);
		return action2action;
	}
	/**
	 * 一般情况下，如果数据进行回显，则把数据放入到对象栈中，页面上可以根据name属性的值进行回显
	 * 如果把数据放入到了map栈，则页面根据value的值进行回显，而且value="%{ognl表达式}"
	 * @return
	 */
	public String updateUI(){
		UserManger usermanger = this.usermangerService.getUserMangerById(this.getModel().getUmid());
		ActionContext.getContext().getValueStack().getRoot().add(0,usermanger);
		//BeanUtils.copyProperties(department, this.getModel());
		//ActionContext.getContext().put("department", department);
		return updateUI;
	}
	
	
	/**
	 * 修改
	 * @return
	 */
	public String update(){
		/**
		 * 1、先根据id把该数据从数据库中提取出来(或者从session的缓存中)
		 * 2、把修改以后的数据赋值到该对象中
		 * 3、针对该对象进行update操作
		 */
		UserManger usermanger = this.usermangerService.getUserMangerById(this.getModel().getUmid());
		BeanUtils.copyProperties(this.getModel(),usermanger);
		this.usermangerService.updateUserManger(usermanger);
		return action2action;
	}
}
