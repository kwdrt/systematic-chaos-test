package com.example.api.dto.request.activity.result;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddAnswerToGraphTaskForm {
    @Schema(required = true) private Long resultId;
    @Schema(required = true) private Long questionId;
    @Schema(required = true) private AnswerForm answerForm;
}
