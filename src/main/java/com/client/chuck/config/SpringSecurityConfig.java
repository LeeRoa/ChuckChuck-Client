package com.client.chuck.config;

import com.client.chuck.provider.CustomAuthenticationProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {

    private final UserDetailsService userDetailsService;

    /**
     * spring security config
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/**").hasRole("USER")
                .anyRequest().permitAll()
                )
                // login setting
                .formLogin(formLogin -> formLogin
                .loginPage("/login")
                .loginProcessingUrl("/loginProcess")
                .defaultSuccessUrl("/", true)
                .failureUrl("/sample")
                .usernameParameter("loginID")
                .passwordParameter("password")
                /* TODO 필요시 추후 정의, 클래스는 생성 해놓음
                    .successHandler(new LoginAuthenticationSuccessHandler())
                    .failureHandler(new LoginAuthenticationFailHandler())
                */

                //logout setting
                /* TODO LOGOUT 설정
                 *
                 */

                .permitAll()
                );





        return http.build();
    }

    /**
     * spring security 예외 URN 설정
     */
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers("/js/**", "/css/**","/imgs/**");
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        return new CustomAuthenticationProvider(userDetailsService);
    }
}
