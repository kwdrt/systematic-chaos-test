package com.example.api.service.activity.feedback;

import com.example.api.dto.request.activity.feedback.SaveUserFeedbackForm;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.error.exception.WrongUserTypeException;
import com.example.api.model.activity.feedback.UserFeedback;
import com.example.api.model.activity.task.Survey;
import com.example.api.model.user.User;
import com.example.api.repo.activity.feedback.UserFeedbackRepo;
import com.example.api.repo.activity.task.SurveyRepo;
import com.example.api.repo.user.UserRepo;
import com.example.api.security.AuthenticationService;
import com.example.api.service.validator.UserValidator;
import com.example.api.service.validator.activity.ActivityValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserFeedbackService {
    private final UserFeedbackRepo userFeedbackRepo;
    private final UserRepo userRepo;
    private final SurveyRepo surveyRepo;
    private final UserValidator userValidator;
    private final AuthenticationService authService;
    private final ActivityValidator activityValidator;

    public UserFeedback saveUserFeedback(UserFeedback feedback) {
        return userFeedbackRepo.save(feedback);
    }

    public UserFeedback saveUserFeedback(SaveUserFeedbackForm form) throws WrongUserTypeException, EntityNotFoundException {
        String email = authService.getAuthentication().getName();
        log.info("Saving user {} feedback for survey with id {}", email, form.getSurveyId());
        User student = userRepo.findUserByEmail(email);
        userValidator.validateStudentAccount(student, email);
        UserFeedback feedback = new UserFeedback();
        feedback.setContent(form.getContent());
        feedback.setFrom(student);
        feedback.setRate(form.getRate());
        Long id = form.getSurveyId();
        Survey survey = surveyRepo.findSurveyById(id);
        activityValidator.validateActivityIsNotNull(survey, id);
        feedback.setSurvey(survey);
        return userFeedbackRepo.save(feedback);
    }
}
