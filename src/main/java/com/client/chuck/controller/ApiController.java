package com.client.chuck.controller;

import com.client.chuck.service.ApiService;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
public class ApiController {

    private final ApiService apiService;

    @GetMapping("/api/holiday-data")
    public ResponseEntity<String> getHolidayData(@RequestParam int year, @RequestParam int month) {
        String response = apiService.getHoliday(year, month);
        return ResponseEntity.ok(response);
    }

}
