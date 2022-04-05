Feature: As a user I can interact with login forms

    @dev
    @smoke
    @regression
    Scenario: As a user I can populate login details leveraging environmental variables
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And I fill in the "email" input with "$.TEST_EMAIL"
        And I fill in the "password" input with "$.TEST_PASSWORD"
        And the "email" should contain the value "admin@example.com"
        And the "password" should contain the value "Password1234"
