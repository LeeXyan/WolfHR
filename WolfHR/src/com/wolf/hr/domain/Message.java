package com.wolf.hr.domain;

import java.util.Date;

public class Message {

	/** 消息级别：正常 */
	public static final int PRIORITY_NORMAL = 0 ;
	/** 消息级别：重要 */
	public static final int PRIORITY_IMPORTANT = 1 ;
	
	/**状态，已发送*/
	public static final int STATUS_SEND = 0 ;
	/**状态，存草稿箱*/
	public static final int STATUS_NOT_SEND = 1 ;
	
	private Long id ;
	private String title ;
	private String content ;
	
	private Date sendTime ;
	private User sender ;
	private User receiver ;
	
	private boolean hasRead ;
	private int priority ; //消息级别
	private int status ;  //消息状态
	
	private boolean deleteFromInbox ; // 从收件箱中删除
	private boolean deleteFromOutbox ; //从发件箱中删除
	
	private String showTime ;
	
	
	public String getShowTime() {
		return showTime;
	}
	public void setShowTime(String showTime) {
		this.showTime = showTime;
	}
	public boolean isDeleteFromInbox() {
		return deleteFromInbox;
	}
	public void setDeleteFromInbox(boolean deleteFromInbox) {
		this.deleteFromInbox = deleteFromInbox;
	}
	public boolean isDeleteFromOutbox() {
		return deleteFromOutbox;
	}
	public void setDeleteFromOutbox(boolean deleteFromOutbox) {
		this.deleteFromOutbox = deleteFromOutbox;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getSendTime() {
		return sendTime;
	}
	public void setSendTime(Date sendTime) {
		this.sendTime = sendTime;
	}
	public User getSender() {
		return sender;
	}
	public void setSender(User sender) {
		this.sender = sender;
	}
	public User getReceiver() {
		return receiver;
	}
	public void setReceiver(User receiver) {
		this.receiver = receiver;
	}
	public boolean isHasRead() {
		return hasRead;
	}
	public void setHasRead(boolean hasRead) {
		this.hasRead = hasRead;
	}
	public int getPriority() {
		return priority;
	}
	public void setPriority(int priority) {
		this.priority = priority;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	
}
