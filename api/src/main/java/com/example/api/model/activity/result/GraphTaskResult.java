package com.example.api.model.activity.result;

import com.example.api.model.activity.task.Activity;
import com.example.api.model.activity.task.GraphTask;
import com.example.api.model.question.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.LinkedList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class GraphTaskResult extends TaskResult {
    @OneToMany
    private List<Answer> answers = new LinkedList<>();

    @ManyToOne
    @JoinColumn(name = "graphTask_id")
    private GraphTask graphTask;

    private int timeSpentSec;
    private Long startDateMillis;
    private Double maxPoints100;

    @Override
    public boolean isEvaluated() {
        return this.getPointsReceived() != null;
    }

    @Override
    public Activity getActivity() {
        return graphTask;
    }
}

