package com.montrealbookclub.booklibrary.service;

import com.montrealbookclub.booklibrary.domain.Book;
import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;
import com.montrealbookclub.booklibrary.repository.BookRepository;
import com.montrealbookclub.booklibrary.repository.RoleRepository;
import com.montrealbookclub.booklibrary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final BookRepository bookRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null){
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database: {}",username);
        }

        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role->{
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });


        return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),authorities);
    }

    @Override
    public User saveUser(User user) {
        log.info("Saving new user {} to the database",user.getName());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        for(Role value:user.getRoles()){
            Role newRole = roleRepository.findById(value.getId()).get();
            value.setName(newRole.getName());
        };
        return userRepository.save(user);
    }

    @Override
    public Role saveRole(Role role) {
        log.info("Saving new role {} to the database", role.getName());
        return roleRepository.save(role);
    }

    @Override
    public Book saveBook(Book book) {
        log.info("Saving book {}", book.getTitle());
        return bookRepository.save(book);
    }

    @Override
    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName,username);
        User user = userRepository.findByUsername(username);
        log.info("&&&&&&&&&&&&&&&&&");
        Role role = roleRepository.findByName(roleName);
        user.getRoles().add(role);
    }

    @Override
    public User addBookToUser(String username, Long id) {
        log.info("Adding id{} to user {}",id,username);
        User user = userRepository.findByUsername(username);
        Optional<Book> book = bookRepository.findById(id);

        user.getBooks().add(book.get());

        book.get().setReserved(true);
        book.get().setBorrower(username);

        int noOfDays = 21; // three weeks
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.DAY_OF_YEAR, noOfDays);
        Date date = calendar.getTime();
        book.get().setReturnDate(date);

        bookRepository.save(book.get());
        return userRepository.save(user);
    }

    @Override
    public User removeBookFromUser(String username, Long id) {
        log.info("removing id{} to user {}",id,username);
        User user = userRepository.findByUsername(username);
//        Book book = bookRepository.findByTitle(title);
        Optional<Book> book = bookRepository.findById(id);
        user.getBooks().remove(book.get());
        book.get().setReserved(false);
        book.get().setBorrower("");
        book.get().setReturnDate(null);
        bookRepository.save(book.get());
        return userRepository.save(user);
    }

    @Override
    public User getUser(String username) {
        log.info("Fetching user {}", username);
        return userRepository.findByUsername(username);
    }

    @Override
    public List<User> getUsers() {
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    @Override
    public List<Book> getBooks() {
        log.info("Fetching all books");
        return  bookRepository.findAll();
    }

    @Override
    public List<Role> getRoles() {
        log.info("Fetching all roles");
        return roleRepository.findAll();
    }


}
