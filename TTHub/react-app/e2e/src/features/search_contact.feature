Feature: As a user I expect to be able to search a new contact

    @smoke
    @regression
    Scenario: As a user I can search for a contact that does not exist
        Given I am on the "Home" page
        And I fill in the "search" input with "Montgomery Burns"
        When the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"
    
    @regression
    Scenario: As a user I can search for a new contact
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And I fill in the "name" input with "Maggie Simpson"
        Then I select the "Female" option from the "gender"
        And I fill in the "phone" input with "939-555-0113"
        And I fill in the "street" input with "742 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page

        And I fill in the "search" input with "Maggie Simpson"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Maggie Simpson"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Female"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "742 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed