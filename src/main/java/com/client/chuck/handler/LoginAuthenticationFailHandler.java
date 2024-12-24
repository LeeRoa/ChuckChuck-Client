package com.client.chuck.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RequiredArgsConstructor
@SuppressWarnings({"unused"})
public class LoginAuthenticationFailHandler implements AuthenticationFailureHandler {

    /*
     * TODO 로그인 실패 시 후처리. 각 exception 처리 구현
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        request.getSession().invalidate();

        if (exception instanceof BadCredentialsException) {
            log.error("아이디 "+exception.getMessage() + "로그인 실패");

            response.getWriter().write("1"); //

        }


    }
}
