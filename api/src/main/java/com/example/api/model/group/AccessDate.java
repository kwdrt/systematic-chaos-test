package com.example.api.model.group;

import com.example.api.model.map.Requirement;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class AccessDate {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToMany(mappedBy = "accessDate")
    private List<Group> groups;
    private Date dateFrom;
    private Date dateTo;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private Requirement requirement;
}
