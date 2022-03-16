Feature: As a user I can interact with autocomplete inputs

    @smoke
    @regression
    Scenario: As a user I can interact and assert on autocomplete inputs
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And I fill in the "movies" input with "The G"
        And I click on "the godfather" button
        And the "movies" should contain the value "The Godfather"
        And the "movies" should not contain the value "The Godfather: Part II"
    
    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on inputs
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And the "outlined required" should equal the value "Testing"
        And the "outlined disabled" should equal the value "Talks"
        And the "outlined read only" should equal the value "Hub"
