Feature: As a use I expect to be able to create a new contact

    @smoke
    @regression
    Scenario: As a user I can cancel creating a new contact
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And I fill in the "name" input with "Milhouse Van Houten"
        Then I select the "Male" option from the "gender"
        And I fill in the "phone" input with "111-525-2313"
        And I fill in the "street" input with "730 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "cancel" button
        And I am directed to the "home" page

        And I click accept on the alert dialog
        And I click the "delete" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Nelson Muntz"
        And the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"
        