Feature: As a user I can interact with radio buttons

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on radio buttons
        Given I am on the "home" page
        And I click on the "playground" button
        And I am directed to the "playground" page
        And the "female" radio button should be checked
