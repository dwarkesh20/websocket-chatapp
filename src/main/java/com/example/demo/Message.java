package com.example.demo;

public class Message {
	private String msg;
	private String sender;
	private MessageType type;
	
	
	public enum MessageType{
		CHAT,JOIN,LEAVE
	}
	
	public Message(String msg, String sender, MessageType type) {
		super();
		this.msg = msg;
		this.sender = sender;
		this.type = type;
	}


	public String getMsg() {
		return msg;
	}


	public void setMsg(String msg) {
		this.msg = msg;
	}


	public String getSender() {
		return sender;
	}


	public void setSender(String sender) {
		this.sender = sender;
	}


	public MessageType getType() {
		return type;
	}


	public void setType(MessageType type) {
		this.type = type;
	}

}