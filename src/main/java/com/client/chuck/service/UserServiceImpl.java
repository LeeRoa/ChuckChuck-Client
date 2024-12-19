package com.client.chuck.service;

import com.client.chuck.dto.User;
import com.client.chuck.util.WebClientUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.client.chuck.util.JsonUtils.jsonToVO;

@RequiredArgsConstructor
@Service("userService")
@SuppressWarnings({"unchecked", "unused"})
public class UserServiceImpl implements UserDetailsService {

    private final WebClientUtils webClientUtils;

    @Value("${chuck.server.url}")
    String server_url;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // TODO API 서버에 로그인 기능이 구현되면 해당 기능 사용
        /*
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("loginID",username);
            String responseMessage = webClientUtils.post(server_url, jsonObject.toJSONString());
         */

        //테스트 데이터 생성
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("loginID","1");
        jsonObject.put("password","1");
        jsonObject.put("role","ROLE_USER");
        String responseMessage = jsonObject.toJSONString();

        try {
            return (User) jsonToVO(responseMessage, User.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }


    }
}
