Feature: As a user I can interact with buttons

    @dev
    @smoke
    @regression
    Scenario: As a I can interact and assert on buttons
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And I click the "1st" "my button" button
        And the "1st" "my button" should contain the text "One"
