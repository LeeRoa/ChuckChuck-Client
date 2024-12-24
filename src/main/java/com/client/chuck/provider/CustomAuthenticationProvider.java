package com.client.chuck.provider;

import com.client.chuck.dto.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;

@RequiredArgsConstructor
public class CustomAuthenticationProvider implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;

    /**
     * Spring security Login 검증 메서드
     *
     * @param authentication (인증 객체)
     * @return Authentication
     * @throws AuthenticationException (인증 과정에서의 예외)
     */
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String loginID = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();

        User user = (User)userDetailsService.loadUserByUsername(loginID);

        System.out.println("user.getLoginID() = "+user.getUsername());
        System.out.println("user.getPassword() = "+user.getPassword());
        System.out.println("user.getAuthorities(); = "+user.getAuthorities());


        // 존재하지 않는 아이디일 시
        if (!loginID.equals(user.getUsername()) || !matchPassword(password, user.getPassword())) {
            throw new BadCredentialsException(loginID);
        }

        return new UsernamePasswordAuthenticationToken(loginID, password, user.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return true;
    }

    private boolean matchPassword(String loginPassword, String password) {
        return loginPassword.equals(password);
    }
}