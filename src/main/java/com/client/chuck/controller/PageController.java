package com.client.chuck.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Slf4j
@Controller
public class PageController {

    @Value("${data.api.encoding}")
    private String encodeApiKey;

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

    @GetMapping("/api/holiday-data")
    public ResponseEntity<String> getHolidayData(@RequestParam int year, @RequestParam int month) {
        String url = "http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";

        String encodedApiKey = URLEncoder.encode(decodeApiKey, StandardCharsets.UTF_8);

        String uriString = UriComponentsBuilder.fromUriString(url)
                .queryParam("ServiceKey", encodedApiKey)
                .queryParam("solYear", year)
                .queryParam("solMonth", String.format("%02d", month))
                .queryParam("_type", "json")
                .build(true).toUriString();

        URI uri = URI.create(uriString);

        RestTemplate restTemplate = new RestTemplate();

        String response = restTemplate.getForObject(uri, String.class);


        return ResponseEntity.ok(response);
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

    //Spring Security 에서 처리
    @ResponseBody
    @PostMapping("/loginProcess")
    public String loginProcess() {
        return "";
    }

    @PostMapping("/mainPage")
    public String mainPage(){
        return "redirect:/";
    }
}
