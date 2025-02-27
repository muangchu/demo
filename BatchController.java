package dev.mchu.demo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.concurrent.*;

@RestController
@RequestMapping("/api/batch")
public class BatchController {
    private static final Logger logger = LoggerFactory.getLogger(BatchController.class);

    // Define the number of parallel threads (customizable)
    private static final int THREAD_POOL_SIZE = 5;

    @GetMapping
    public ResponseEntity<String> runSomething() {
        logger.info("Batch execution started.");

        // List of files to be processed
        List<String> files = List.of("file1", "file2", "file3", "file4", "file5",
                "file6", "file7", "file8", "file9", "file10");

        // Create a fixed thread pool to limit the number of concurrent tasks
        ExecutorService executor = Executors.newFixedThreadPool(THREAD_POOL_SIZE);

        try {
            logger.info("Executing {} tasks with a thread pool of size {}.", files.size(), THREAD_POOL_SIZE);

            // Submitting tasks to executor
            List<Future<String>> results = executor.invokeAll(
                    files.stream()
                            .map(filename -> (Callable<String>) () -> task1(filename))
                            .toList()
            );

            // Collecting results
            for (Future<String> result : results) {
                logger.info("Task result: {}", result.get());
            }

            logger.info("Batch execution completed successfully.");
        } catch (ExecutionException e) {
            logger.error("Execution error occurred: {}", e.getMessage(), e);
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Preserve interrupt status
            logger.error("Batch execution was interrupted.", e);
            return ResponseEntity.status(500).body("Batch execution interrupted.");
        } finally {
            executor.shutdown(); // Ensure proper shutdown
        }

        return ResponseEntity.ok("Batch execution completed!");
    }

    /**
     * Simulates processing of a file.
     * @param filename The file being processed.
     * @return A success message after processing.
     * @throws InterruptedException If the thread is interrupted.
     */
    private String task1(String filename) throws InterruptedException {
        logger.info("Processing file: {}", filename);
        Thread.sleep(1000); // Simulate time-consuming task
        logger.info("Processing completed for: {}", filename);
        return "Processed " + filename;
    }
}
