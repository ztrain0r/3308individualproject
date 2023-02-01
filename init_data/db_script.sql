CREATE DATABASE searchHistory;

CREATE TABLE IF NOT EXISTS history (
    showTitle VARCHAR(100),
    premierDate DATE,
    showStatus VARCHAR(20),
    showLanguage VARCHAR(40),
    showSummary TEXT
);

-- INSERT INTO history(showTitle, premierDate, showStatus, showLanguage, showSummary) VALUES ('Test Show', '2000-01-01', 'Ended', 'English', 'This is a test show.');