package com.montrealbookclub.booklibrary.domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String borrower;

    private String bookImageLink;
    private String bookInfoLink;
    private Boolean reserved;


    @ElementCollection
    private List<String> writers ;
    @ElementCollection
    private Collection<String> donors ;
    @ElementCollection
    private Collection<String> translators ;
}

