package com.jsp.jpa.dto;

import com.jsp.jpa.common.Role;
import lombok.Data;

@Data
public class UserDto {
    private int idx;
    private Role role;

    public UserDto(int idx, Role role) {
        this.idx = idx;
        this.role = role;
    }

    // getters and setters
}