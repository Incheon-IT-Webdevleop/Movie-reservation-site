package com.jsp.jpa.dto;

import lombok.Data;

@Data
public class UserDto {
    private String email;
    private String role;

    public UserDto(String email, String role) {
        this.email = email;
        this.role = role;
    }

    // getters and setters
}