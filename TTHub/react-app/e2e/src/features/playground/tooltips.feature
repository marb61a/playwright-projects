Feature: As a user I can interact with tooltips

    @smoke
    @regression
    Scenario: As a I can interact and assert on new tooltips
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And the "tooltip" "title" attribute should contain the text "This is a tooltip"
        And the "tooltip" "title" attribute should not contain the text "This is not a tooltip"
