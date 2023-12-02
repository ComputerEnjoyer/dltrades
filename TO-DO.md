# TO-DOs for branch

main() has 4 main processes

1. Converting a .csv to a list myBinder: MyCard[]
2. Creating a list of URLs to scrape
3. Scraping URLs in a queue
4. Comparing myBinder to the results from the scrape

(1), (2), and (4) can be done sychronously without performance loss.

(3) must be done asynchronously to manage the lag time around get() requests to a slow server.

In the current design, (3) processes URLs in batches of n URLs, but must complete all URLs before (4) can be completed.

IDEA: refactor main() to loop through myBinder, process n URLs at a time, then compare n URLs.
