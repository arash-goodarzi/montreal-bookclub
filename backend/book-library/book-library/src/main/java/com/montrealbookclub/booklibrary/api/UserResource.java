package com.montrealbookclub.booklibrary.api;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.montrealbookclub.booklibrary.domain.Book;
import com.montrealbookclub.booklibrary.domain.Role;
import com.montrealbookclub.booklibrary.domain.User;
import com.montrealbookclub.booklibrary.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Arrays.stream;
import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins ="*")
public class UserResource {
    private final UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok().body(userService.getUsers());
    }

    @PostMapping("/user/save")
    public ResponseEntity<User> saveUser(@RequestBody User user) {

        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/user/save").toString());
        return ResponseEntity.created(uri).body(userService.saveUser(user));
    }

    @PostMapping("/role/save")
    public ResponseEntity<Role> saveRole(@RequestBody Role role) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/role/save").toString());
        return ResponseEntity.created(uri).body(userService.saveRole(role));
    }

    @PostMapping("/role/addtouser")
    public ResponseEntity<?> addRoleToUser(@RequestBody RoleToUserForm form) {
        userService.addRoleToUser(form.getUserName(),form.getRoleName());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/books")
    public ResponseEntity<List<Book>> getBooks(){return ResponseEntity.ok().body(userService.getBooks());}

    @PostMapping("/book/save")
    public ResponseEntity<Book> saveBook(@RequestBody Book book){
        URI uri =URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/book/save").toString());
        return ResponseEntity.created(uri).body(userService.saveBook(book));
    }

    @PostMapping("/book/reserve/{name}")
    public ResponseEntity<User> reserveBook(@PathVariable("name") String title, @RequestBody User user){
        URI uri =URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/book/save").toString());
        return ResponseEntity.created(uri).body(userService.addBookToUser(user.getUsername(),title));
    }

    @PostMapping("/book/unReserve/{name}")
    public ResponseEntity<User> unReserveBook(@PathVariable("name") String title, @RequestBody User user){
        URI uri =URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/book/save").toString());
        return ResponseEntity.created(uri).body(userService.removeBookFromUser(user.getUsername(),title));
    }

//    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/token/refresh")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(AUTHORIZATION);

        if(authorizationHeader !=null && authorizationHeader.startsWith("Bearer ")){
            try{
                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier  = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String username = decodedJWT.getSubject();
                User user = userService.getUser(username);

                String access_token = JWT.create()
                        .withSubject(user.getUsername())
                        .withExpiresAt(new Date(System.currentTimeMillis()+ 30 * 60 * 1000))
                        .withIssuer(request.getRequestURI().toString())
                        .withClaim("roles",user.getRoles().stream().map(Role::getName).collect(Collectors.toList()))
                        .sign(algorithm);


                Map<String,String> tokens = new HashMap<>();
                tokens.put("access_token",access_token);
                tokens.put("refresh_token",refresh_token);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),tokens);

            }catch (Exception exception){

                response.setHeader("error",exception.getMessage());
//                    response.sendError(FORBIDDEN.value());
                response.setStatus(FORBIDDEN.value());
                Map<String,String> error =new HashMap<>();
                error.put("error_message", exception.getMessage());
                response.setContentType(APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(),error);
            }
        }else {
            throw new RuntimeException("Refresh token is missiong");
        }
    }

}

@Data
class RoleToUserForm {
    private String userName;
    private String roleName;
}