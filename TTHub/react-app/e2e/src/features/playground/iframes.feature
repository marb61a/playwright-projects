Feature: As a user I can interact woth IFrames

    @dev
    @smoke
    @regression
    Scenario: As a I can interact and assert on IFrames
        Given I am on the "home" page
        And I click on the "playground" button
        When I am directed to the "playground" page
        And I fill in the "search" input on the "basic iframe" iframe with "Abraham Perry"
        