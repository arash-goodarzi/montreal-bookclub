package com.montrealbookclub.booklibrary.repository;

import com.montrealbookclub.booklibrary.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByName(String name);
}
