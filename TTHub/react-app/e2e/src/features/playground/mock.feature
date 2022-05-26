Feature: As a user I can intercept a REST api and mock the response

    @smoke
    @regression
    Scenario: As a user I expect to see the REST users
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        Then the "1st" "full name" should contain the text "Paul Smith"

    @smoke
    @regression
        Scenario: As a user I can mock no users existing
        Given I am on the "home" page
        And the "api" endpoint for "users" is mocked with "no users"
        And I click the "playground" button
        When I am directed to the "playground" page
        Then the "full name" should not be displayed

    @smoke
    @regression
    Scenario: As a user I can mock a single user
        Given I am on the "home" page
        And the "api" endpoint for "users" is mocked with "single user"
        When I click the "playground" button
        And I am directed to the "playground" page
        Then the "1st" "full name" should not contain the text "Leanne Graham"
        And the "1st" "full name" should contain the text "Paul Smith"
    
    @smoke
    @regression
    Scenario: As a user I can mock multiple users
        Given I am on the "home" page
        And the "api" endpoint for "users" is mocked with "multiple users"
        When I click the "playground" button
        And I am directed to the "playground" page
        And the "1st" "full name" should contain the text "Peter Smith"
        And the "2nd" "full name" should contain the text "Mary Jane"
        And the "3rd" "full name" should contain the text "Joe Bloggs"

    @smoke
    @regression
    Scenario: As a user I can validate only 5 users will display as expected
        Given I am on the "home" page
        And the "api" endpoint for "users" is mocked with "six users"
        When I click the "playground" button
        And I am directed to the "playground" page
        And the "1st" "full name" should contain the text "John Smith"
        And the "2nd" "full name" should contain the text "Helen Brown"
        And the "3rd" "full name" should contain the text "Jack Spratt"
        And the "4th" "full name" should contain the text "Mary Jones"
        And the "5th" "full name" should contain the text "Ted Nugent"
        And the "6th" "full name" should not be displayed
