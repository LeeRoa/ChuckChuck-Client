package com.client.chuck.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class pageController {
    @Value("${data.api.encoding}")
    private String apiEncoding;

    @Value("${data.api.decoding}")
    private String apiDecoding;

    @GetMapping("/sample")
    public String sample() {
        return "sample";
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/join")
    public String join(Model model) {
        return "account/join";
    }

    @GetMapping("/join/set-password")
    public String setPassword(Model model) {
        return "account/set-password";
    }

    @GetMapping("/join/verify-email")
    public String verifyEmail(Model model) {
        return "account/verify-email";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "account/login";
    }

}
