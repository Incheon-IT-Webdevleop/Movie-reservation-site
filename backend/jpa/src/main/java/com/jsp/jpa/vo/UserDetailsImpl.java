package com.jsp.jpa.vo;

import com.jsp.jpa.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

@RequiredArgsConstructor
public class UserDetailsImpl implements UserDetails {

    private final User user;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(() -> user.getRole().getKey()); // key: ROLE_권한
        return authorities;
    }

    @Override
    public String getUsername() {
        return user.getUserID();
    }

    @Override
    public String getPassword() {
        return user.getUserPW();
    }

    public User getUser() {
        return user;
    }

    // == 세부 설정 == //

    @Override
    public boolean isAccountNonExpired() { // 계정의 만료 여부
        return true;
    }

    @Override
    public boolean isAccountNonLocked() { // 계정의 잠김 여부
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() { // 비밀번호 만료 여부
        return true;
    }

    @Override
    public boolean isEnabled() { // 계정의 활성화 여부
        return true;
    }
}

