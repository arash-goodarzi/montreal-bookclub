package com.montrealbookclub.booklibrary.service;

import com.montrealbookclub.booklibrary.domain.Book;
import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;


import java.util.List;

public interface UserService {
    User saveUser(User user);

    Role saveRole(Role role);
    Book saveBook(Book book);
    void addRoleToUser(String username, String roleName);
    User addBookToUser(String username, Long id);
    User removeBookFromUser(String username, Long id);
    User getUser(String username);
    List<User> getUsers();

    List<Book> getBooks();


    List<Role> getRoles();



}
