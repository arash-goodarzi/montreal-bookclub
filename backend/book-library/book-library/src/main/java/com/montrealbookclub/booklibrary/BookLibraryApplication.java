package com.montrealbookclub.booklibrary;

import com.montrealbookclub.booklibrary.domain.Book;
import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;
import com.montrealbookclub.booklibrary.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

			userService.saveUser(new User(null,"a1","aras.goodarzi@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"a2","aras1.goodarzi@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"a3","aras2.goodarzi@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"a4","aras3.goodarzi@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"zoro@gmail.com","zoro@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));

			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_USER");
			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_ADMIN");
			userService.addRoleToUser("aras1.goodarzi@gmail.com","ROLE_USER");
			userService.addRoleToUser("aras2.goodarzi@gmail.com","ROLE_USER");
			userService.addRoleToUser("aras3.goodarzi@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("aras3.goodarzi@gmail.com","ROLE_USER");
			userService.addRoleToUser("zoro@gmail.com","ROLE_USER");
			userService.addRoleToUser("zoro@gmail.com","ROLE_MANAGER");

			userService.saveBook(new Book(null,"Alice in wonder land","","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Falice-in-wonderland.jpg","https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows",false,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
			userService.saveBook(new Book(null,"Zoro in wonder land","","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Falice-in-wonderland.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
			userService.saveBook(new Book(null,"Edward in wonder land","","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Falice-in-wonderland.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
			userService.saveBook(new Book(null,"Oscar in wonder land","","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Falice-in-wonderland.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",true,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
			userService.saveBook(new Book(null,"Ted in wonder land","","https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2016%2F07%2Falice-in-wonderland.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));
//			userService.saveBook(new Book(null,"Ted in wonder land","","D:\\Who_Moved_My_Cheese.jpg",false,new ArrayList<>(),new ArrayList<>(),new ArrayList<>()));

		};
	}

}
