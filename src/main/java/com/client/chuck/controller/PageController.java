package com.client.chuck.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequiredArgsConstructor
@Slf4j
@Controller
public class PageController {

    @Value("${data.api.decoding}")
    private String decodeApiKey;

    @GetMapping("/sample")
    public String sample() {
        return "sample";
    }

    @GetMapping("/404")
    public String errorPage() {
        return "404";
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

    @GetMapping("/join/request-join")
    public String requestJoin() {
        return "account/request-join";
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

    @GetMapping("/admin/company-info")
    public String companyInfo() {
        return "admin/company-info";
    }

    @GetMapping("/admin/work-time")
    public String workTime() {
        return "admin/work-time";
    }

    //Spring Security 에서 처리
    @ResponseBody
    @PostMapping("/loginProcess")
    public String loginProcess() {
        return "";
    }

    @ResponseBody
    @GetMapping("/logoutProcess")
    public String logoutProcess(){ return ""; }

    @PostMapping("/mainPage")
    public String mainPage(){
        return "redirect:/";
    }
}
