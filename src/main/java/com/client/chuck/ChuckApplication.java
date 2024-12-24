package com.client.chuck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class ChuckApplication {

    public static void main(String[] args) {
        SpringApplication.run(ChuckApplication.class, args);
    }

}
