package com.montrealbookclub.booklibrary;

import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;
import com.montrealbookclub.booklibrary.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;

@SpringBootApplication
public class BookLibraryApplication {



	public static void main(String[] args) {

		System.out.println("^^^^^^^^^^^^^^^^^^^^^^");
		SpringApplication.run(BookLibraryApplication.class, args);
	}

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	public CommandLineRunner run(UserService userService){
		return  args -> {
			userService.saveRole(new Role(null,"ROLE_USER"));
			userService.saveRole(new Role(null,"ROLE_MANAGER"));
			userService.saveRole(new Role(null,"ROLE_ADMIN"));
			userService.saveRole(new Role(null,"ROLE_FREE"));

			userService.saveUser(new User(null,"a1","John","1234",new ArrayList<>()));
			userService.saveUser(new User(null,"a2","Ted","1234",new ArrayList<>()));
			userService.saveUser(new User(null,"a3","Mark","1234",new ArrayList<>()));
			userService.saveUser(new User(null,"a4","July","1234",new ArrayList<>()));
			userService.saveUser(new User(null,"zoro@gmail.com","zoro@gmail.com","1234",new ArrayList<>()));

			userService.addRoleToUser("John","ROLE_USER");
			userService.addRoleToUser("John","ROLE_MANAGER");
			userService.addRoleToUser("John","ROLE_ADMIN");
			userService.addRoleToUser("Ted","ROLE_USER");
			userService.addRoleToUser("Ted","ROLE_USER");
			userService.addRoleToUser("Mark","ROLE_MANAGER");
			userService.addRoleToUser("July","ROLE_USER");
			userService.addRoleToUser("zoro@gmail.com","ROLE_USER");
			userService.addRoleToUser("zoro@gmail.com","ROLE_MANAGER");
		};
	}

}
