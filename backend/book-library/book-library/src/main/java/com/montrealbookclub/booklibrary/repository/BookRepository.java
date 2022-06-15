package com.montrealbookclub.booklibrary.repository;

import com.montrealbookclub.booklibrary.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book,Long> {
    Book findByTitle(String title);
}
