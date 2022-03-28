Feature: As a user I can interact with hidden and displayed text

    @dev
    @smoke
    @regression
    Scenario: As a I can interact and assert on new hidden and displayed text
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And the "show hide text" should be displayed
        And the "show hide text" should contain the text "This is visible"
        And I click the "show hide button"
        And the "show hide text" should not be displayed
