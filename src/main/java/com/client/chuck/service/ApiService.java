package com.client.chuck.service;

import com.client.chuck.util.WebClientUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@Service
public class ApiService {

    private final WebClientUtils webClientUtils;

    @Value("${data.api.decoding}")
    private String decodeApiKey;

    public String getHoliday(int year, int month) {
        String url = "https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo";
        String encodedApiKey = URLEncoder.encode(decodeApiKey, StandardCharsets.UTF_8);

        String fullUri = url + "?ServiceKey=" + encodedApiKey +
                "&solYear=" + year +
                "&solMonth=" + String.format("%02d", month) +
                "&_type=json";

        return webClientUtils.get(fullUri);
    }

}
