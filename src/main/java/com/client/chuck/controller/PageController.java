package com.client.chuck.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
public class PageController {

    @GetMapping("/sample")
    public String sample() {
        return "sample";
    }

    @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/join")
    public String join() {
        return "account/join";
    }

    @GetMapping("/join/set-password")
    public String setPassword() {
        return "account/set-password";
    }

    @GetMapping("/join/verify-email")
    public String verifyEmail() {
        return "account/verify-email";
    }

    @GetMapping("/login")
    public String login() {
        return "account/login";
    }

    @GetMapping("/login/find-id")
    public String findId() {
        return "account/find-id";
    }

    @GetMapping("/login/find-pw")
    public String findPw() {
        return "account/find-pw";
    }

    @GetMapping("/login/find-pw/reset-password")
    public String resetPassword() {
        return "account/reset-password";
    }

    //Spring Security 에서 처리
    @ResponseBody
    @PostMapping("/loginProcess")
    public String loginProcess(){ return ""; }

}
