Feature: As a user I expect to be able to create contacts

    @smoke
    @regression
    Scenario: As a user I expect to be able to create a new contact
        Given I am on the "home" page
        And I click on the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should contain the text "Create Contact"
        And I fill in the "name" input with "Joe Bloggs"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "012345678" 
        And I fill in the "street" input with "1 Main Street"
        And I fill in the "city" input with "London"
        And I click on the "save" button

        And I am directed to the "home" page
        And I fill in the "search" input with "Joe Bloggs"
        And the "full name label" should contain the text "Joe Bloggs"
        And the "name" should contain the text "Joe Bloggs"
        And the "gender label" should contain the text "Gender"
        And the "gender" should contain the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "1 Main Street"
        And the "edit" should be displayed
        And the "delete" should be displayed 
