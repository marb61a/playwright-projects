Feature: As a user I can refresh the browser and see the application

    @dev
    @smoke
    @regression
    Scenario: As a I can refresh the browser and be on the page expected
        Given I am on the "home" page
        And I refresh the "home" button
        When I am click on the "playground" button
        And I am directed to the "playground" page
        Then I refresh the "playground" page
        