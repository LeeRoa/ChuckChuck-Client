package com.client.chuck.config;

import com.client.chuck.handler.LoginAuthenticationFailHandler;
import com.client.chuck.handler.LoginAuthenticationSuccessHandler;
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
                .usernameParameter("empEmail")
                .passwordParameter("empPw")
                .successHandler(new LoginAuthenticationSuccessHandler())
                .failureHandler(new LoginAuthenticationFailHandler())
                .permitAll()
                )

                //logout setting
                .logout(logout -> logout
                .logoutUrl("/logoutProcess")
                .logoutSuccessUrl("/")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
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
