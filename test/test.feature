Feature: Something Something

    Scenario Outline: scenario-outline
        Given there are <start> cucumbers
        When I eat <eat> cucumbers
        Then I should have <left> cucumbers

        Examples:
            | start | eat | left |
            |  12   |  5  |  7   |
            |  20   |  5  |  15  |

    Scenario: data table
        Given a simple data table
            | foo | bar |
            | boz | boo |
        And a data table with a single cell
            | foo |
        And a data table with different fromatting
            |   foo|bar|    boz    |    
        And a data table with an empty cell
            |foo||boz|
        And a data table with comments and newlines inside
            | foo | bar |

            | boz  | boo  |
            # this is a comment
            | boz2 | boo2 |


	Scenario: docstring
		Given a simple DocString
		"""
		first line (no indent)
		  second line (indented with two spaces)

		third line was empty
		"""
		Given a DocString with content type
		"""xml
		<foo>
			<bar />
		</foo>
		"""
		And a DocString with wrong indentation
		"""
	wrongly indented line
		"""
		And a DocString with alternative separator
		```
		first line
		second line
		```
		And a DocString with normal separator inside
		```
		first line
		"""
		third line
		```
		And a DocString with alternative separator inside
		"""
		first line
		```
		third line
		"""
		And a DocString with escaped separator inside
		"""
		first line
		\"\"\"
		third line
		"""

  Scenario: They are the future
    Given they have arrived
      | æ | o |
      | a | ø |
    Given they have arrived
      | æ   | \|o |
      | \|a | ø\\ |

@😐🎸
Scenario: 🙈🙉🙊
	📚

  Given 📕
  When 💃

@so_tag1  @so_tag2  
  @so_tag3
Scenario Outline: minimalistic outline
    Given the <what>

@ex_tag1 @ex_tag2
  @ex_tag3
Examples: 
  | what       |
  | minimalism |

@ex_tag4 @ex_tag5
  @ex_tag6
Examples: 
  | what            |
  | more minimalism |

