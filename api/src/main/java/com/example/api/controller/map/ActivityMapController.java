package com.example.api.controller.map;

import com.example.api.dto.response.map.ActivityMapResponse;
import com.example.api.error.exception.EntityNotFoundException;
import com.example.api.service.map.ActivityMapService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/map")
@SecurityRequirement(name = "JWT_AUTH")
public class ActivityMapController {
    private final ActivityMapService activityMapService;

    @GetMapping
    public ResponseEntity<ActivityMapResponse> getActivityMap(@RequestParam Long activityMapId)
            throws EntityNotFoundException {
        return ResponseEntity.ok().body(activityMapService.getActivityMap(activityMapId));
    }
}
