package com.jsp.jpa.controller;

import com.jsp.jpa.common.JwtTokenProvider;
import com.jsp.jpa.dto.UserDto;
import com.jsp.jpa.model.User;
import com.jsp.jpa.repository.UserRepository;
import com.jsp.jpa.vo.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class HelloController {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;

    @PostMapping("/user-info")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String token) {
        log.info("Received token: {}", token);
        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        log.info("Validating token: {}", token);
        if (jwtTokenProvider.validateAccessToken(token)) {
            Authentication authentication = jwtTokenProvider.getAuthentication(token);
            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            log.info("User details: {}", userDetails);
            User user = userRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            UserDto userDto = new UserDto(user.getEmail(), user.getRole().getTitle());
            log.info("User DTO: {}", userDto);
            return ResponseEntity.ok(userDto);
        } else {
            log.warn("Invalid or expired token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
        }
    }


}
