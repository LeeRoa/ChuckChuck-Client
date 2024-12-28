package com.client.chuck.service;

import com.client.chuck.dto.User;
import com.client.chuck.util.JsonUtils;
import com.client.chuck.util.OpCode;
import com.client.chuck.util.WebClientUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static com.client.chuck.util.JsonUtils.jsonToVO;

@RequiredArgsConstructor
@Service("userService")
@SuppressWarnings({"unused"})
public class UserServiceImpl implements UserDetailsService {

    private final WebClientUtils webClientUtils;

    @Value("${chuck.server.url}")
    String server_url;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {



        // 운영용 서버 통신
        /*
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("empEmail",username);
        String responseMessage = webClientUtils.post(server_url, jsonObject.toJSONString());
        */

        // 개발용 서버 통신 X
        String responseMessage = "{\"resultCode\":\"0\",\"resultMsg\":\"정상 처리\",\"empInfo\":{\"empEmail\":\"4\",\"empPw\":\"4\",\"role\":\"ROLE_USER\"}}";
        System.out.println("responseMessage = "+responseMessage);
        try {
            if((JsonUtils.jsonParser(responseMessage, OpCode.RESULT_CODE)).equals(OpCode.SUCCESS_CODE)){
                String empInfo = JsonUtils.jsonParser(responseMessage,"empInfo");
                System.out.println("empInfo = "+empInfo);
                return (User) jsonToVO(empInfo, User.class);
            }
            else{
                return null;
            }
        } catch (ParseException | JsonProcessingException e) {
            throw new RuntimeException(e);
        }


    }
}
