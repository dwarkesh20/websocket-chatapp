package com.example.demo;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@CrossOrigin("*")
public class WebSocketController {
	
	@MessageMapping("/chat.register")
	@SendTo("/topic/public")
	public Message register(@Payload Message message, SimpMessageHeaderAccessor accessor) {
		accessor.getSessionAttributes().put("username", message.getSender());
		return message;
	}
	
	
	@MessageMapping("/chat.send")
	@SendTo("/topic/public")
	public Message sendMessage(@Payload Message message) {
		return message;
	}
	
	
	
	
}
