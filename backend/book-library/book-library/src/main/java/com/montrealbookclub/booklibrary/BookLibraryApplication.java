package com.montrealbookclub.booklibrary;

import com.montrealbookclub.booklibrary.domain.Book;
import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;
import com.montrealbookclub.booklibrary.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.*;

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

			userService.saveUser(new User(null,"aras.goodarzi@gmail.com","aras.goodarzi@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"barbara.niven@gmail.com","barbara.niven@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"arthur.morgan@gmail.com","arthur.morgan@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"ted.mosby@gmail.com","ted.mosby@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"mark.wahlberg@gmail.com","mark.wahlberg@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));

			userService.saveUser(new User(null,"will.ferrell@gmail.com","will.ferrell@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"morgan.fairchild@gmail.com","morgan.fairchild@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"carlo.marks@gmail.com","carlo.marks@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"david.niven.jr@gmail.com","david.niven.jr@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"erica.durance@gmail.com","erica.durance@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"freddie.prinze.jr@gmail.com","freddie.prinze.jr@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"gabrielle.union@gmail.com","gabrielle.union@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"hailee.steinfeld@gmail.com","hailee.steinfeld@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"ilya.mikheyev@gmail.com","ilya.mikheyev@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"jimmy.vesey@gmail.com","jimmy.vesey@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"kevin.durant@gmail.com","kevin.durant@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"laurence.fishburne@gmail.com","laurence.fishburne@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"nicolas.cage@gmail.com","nicolas.cage@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));
			userService.saveUser(new User(null,"olivier.martinez@gmail.com","olivier.martinez@gmail.com","1234",new ArrayList<>(),new ArrayList<>()));

			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_USER");
			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_ADMIN");
//			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_MANAGER");
//			userService.addRoleToUser("aras.goodarzi@gmail.com","ROLE_ADMIN");
			userService.addRoleToUser("barbara.niven@gmail.com","ROLE_USER");
			userService.addRoleToUser("arthur.morgan@gmail.com","ROLE_USER");
			userService.addRoleToUser("ted.mosby@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("mark.wahlberg@gmail.com","ROLE_USER");
			userService.addRoleToUser("will.ferrell@gmail.com","ROLE_USER");
			userService.addRoleToUser("morgan.fairchild@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("carlo.marks@gmail.com","ROLE_USER");
			userService.addRoleToUser("david.niven.jr@gmail.com","ROLE_USER");
			userService.addRoleToUser("erica.durance@gmail.com","ROLE_USER");
			userService.addRoleToUser("freddie.prinze.jr@gmail.com","ROLE_USER");
			userService.addRoleToUser("gabrielle.union@gmail.com","ROLE_USER");
			userService.addRoleToUser("hailee.steinfeld@gmail.com","ROLE_USER");
			userService.addRoleToUser("ilya.mikheyev@gmail.com","ROLE_USER");
			userService.addRoleToUser("jimmy.vesey@gmail.com","ROLE_USER");
			userService.addRoleToUser("kevin.durant@gmail.com","ROLE_USER");
			userService.addRoleToUser("laurence.fishburne@gmail.com","ROLE_USER");
			userService.addRoleToUser("laurence.fishburne@gmail.com","ROLE_MANAGER");
			userService.addRoleToUser("laurence.fishburne@gmail.com","ROLE_ADMIN");
			userService.addRoleToUser("nicolas.cage@gmail.com","ROLE_USER");
			userService.addRoleToUser("olivier.martinez@gmail.com","ROLE_USER");




			userService.saveBook(new Book(null,"Spring in Action(5th Edition)","","https://miro.medium.com/max/720/0*i9I6Rd-rQm6D5HRt.png","https://www.goodreads.com/book/show/136251.Harry_Potter_and_the_Deathly_Hallows",false,null,new ArrayList<String>(Collections.singleton("Craig Walls")),new ArrayList<String>(Collections.singleton("Adam west")),new ArrayList<>()));
			userService.saveBook(new Book(null,"Spring Boot in Action","","https://miro.medium.com/max/796/0*SKH61tR0mgFSr4GU.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Collections.singleton("Craig Walls")),new ArrayList<String>(Collections.singleton("Adam west")),new ArrayList<>()));

			userService.saveBook(new Book(null,"Spring Microservices in Action","","https://miro.medium.com/max/1400/0*j2yFxC64SLC8qTv_.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Collections.singleton("Edward John Carnell")),new ArrayList<String>(Collections.singleton("Martin Foster")),new ArrayList<>()));
			userService.saveBook(new Book(null,"Reactive Spring","","https://miro.medium.com/max/1392/0*Qa-1gAWLDFGJEQoj","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",true,null,new ArrayList<String>(Collections.singleton("Josh Long")),new ArrayList<String>(Collections.singleton("Martin Foster")),new ArrayList<>()));

			userService.saveBook(new Book(null,"Spring Security in Action","","https://miro.medium.com/max/638/0*8osOoVWDvFUI2vH8.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Collections.singleton("Laurentiu Spilca")),new ArrayList<String>(Collections.singleton("Adam west")),new ArrayList<>()));
			userService.saveBook(new Book(null,"ExpertSpring MVC and Web Flow","","https://miro.medium.com/max/486/0*TFDCd4qpxRGtEK3P.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Collections.singleton("Seth Ladd")),new ArrayList<String>(Collections.singleton("Martin Foster")),new ArrayList<>()));

			userService.saveBook(new Book(null,"Spring 5 Recipes","","https://miro.medium.com/max/448/0*MeeYhyIcYncrynoJ.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Arrays.asList("Daniel Rubio", "Marten Deinum", "Josh Long")),new ArrayList<String>(Collections.singleton("Martin Foster")),new ArrayList<>()));
			userService.saveBook(new Book(null,"ProfessionalJava Development with the Spring Framework","","https://miro.medium.com/max/414/0*lh44FSgQ3KxGKRMN.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Arrays.asList("Alef Arendsen", "Colin Sampaleanu", "Juergen Hoeller", "Thomas Risberg", "Rod Johnson")),new ArrayList<String>(Collections.singleton("Francois Larochelle")),new ArrayList<>()));

			userService.saveBook(new Book(null,"Pro Spring 5.0","","https://miro.medium.com/max/448/0*KFL6ofQzVnYy_CDB.jpg","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Arrays.asList("Clarence Ho", "Chris Schaefer", "Rob Harrop", "Iuliana Cosmina")),new ArrayList<String>(Collections.singleton("Francois Larochelle")),new ArrayList<>()));
			userService.saveBook(new Book(null,"Spring Boot: Up and Running","","https://miro.medium.com/max/434/0*WDPYT4vUZNzMcP10","https://www.goodreads.com/book/show/59715.The_Authoritative_Calvin_and_Hobbes",false,null,new ArrayList<String>(Collections.singleton("Mark Heckler")),new ArrayList<String>(Collections.singleton("Francois Larochelle")),new ArrayList<>()));

		};
	}

}
