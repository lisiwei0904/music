package com.example.music.domain;

public class Admin {
    private Integer id;
    private String admin;
    private String password;

    public Admin(Integer id, String admin, String password) {
        this.id = id;
        this.admin = admin;
        this.password = password;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
