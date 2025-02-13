package com.jsp.jpa.repository;

import com.jsp.jpa.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserID(String id);

    Optional<User> findByUserIDX(int idx);
}