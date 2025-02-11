package com.example.api.util.csv;

import com.example.api.model.user.User;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class CSVConverter implements Converter<Map<User, List<CSVTaskResult>>> {
    private final static String institution = "Akademia Górniczo-Hutnicza";
    private final static String department = "Wydział Informatyki, Elektroniki i Telekomunikacji";

    @Override
    public byte[] convertToByteArray(Map<User, List<CSVTaskResult>> data, List<String> firstRow) throws IOException {
        List<List<String>> csv = new ArrayList<>();
        csv.add(firstRow);
        for (User user: data.keySet()) {
            List<CSVTaskResult> csvTaskResults = data.get(user);
            List<String> userData = List.of(user.getFirstName(),
                    user.getLastName(),
                    user.getIndexNumber().toString(),
                    institution,
                    department,
                    user.getEmail());
            List<String> row = csvTaskResults.stream()
                    .map(CSVTaskResult::toStringList)
                    .flatMap(List::stream)
                    .toList();
            row = Stream.of(userData, row).flatMap(List::stream).toList();
            csv.add(row);
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        try (PrintWriter pw = new PrintWriter(out)){
            csv.stream()
                    .map(this::convertToCSV)
                    .forEach(pw::println);
        }
        return out.toByteArray();
    }

    private String convertToCSV(List<String> row) {
        return Stream.of(row)
                .flatMap(List::stream)
                .map(this::escapeSpecialCharacters)
                .collect(Collectors.joining(","));
    }

    private String escapeSpecialCharacters(String data) {
        String escapedData = data.replaceAll("\\R", " ");
        if (data.contains(",") || data.contains("\"") || data.contains("'")) {
            data = data.replace("\"", "\"\"");
            escapedData = "\"" + data + "\"";
        }
        return escapedData;
    }
}
