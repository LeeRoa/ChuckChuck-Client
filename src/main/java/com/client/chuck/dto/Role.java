package com.client.chuck.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    CEO("ROLE_CEO"), // 사장
    SUPER("ROLE_SUPER"), // 최고 관리자
    MANAGER("ROLE_MANAGER"), // 중간 관리자
    USER("ROLE_USER"); // 일반 사용자

    private final String value;
}
