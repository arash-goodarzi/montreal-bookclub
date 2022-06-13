package com.montrealbookclub.booklibrary.repository;

import com.montrealbookclub.booklibrary.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUsername(String username);
}
