package com.client.chuck.handler;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

@Slf4j
@RequiredArgsConstructor
@SuppressWarnings({"unused"})
public class LoginAuthenticationFailHandler implements AuthenticationFailureHandler {

    /*
     * TODO 로그인 실패 시 후처리. 각 exception 처리 구현
     */
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) {
        /*
        request.getSession().invalidate();

        String loginID = request.getParameter("loginID");


        if (exception instanceof InternalAuthenticationServiceException) {
        } else if (exception instanceof BadCredentialsException) {
        } else if (exception instanceof DisabledException) {
        } else if (exception instanceof CredentialsExpiredException) {
        } else if (exception instanceof LockedException) {
        }

         */

    }
}
