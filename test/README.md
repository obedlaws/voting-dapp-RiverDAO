# TESTS

#### 1. Deployment

This is a test to see if the contracts deploys and the Status
of the smart contract starts in 0 or 'RegisteringVoters'.


#### 2. Testing ERROR registering

(FAILED TEST ON PURPOSE)
Test should return an error saying 'Not enough token to register' to check if msg.sender has enough VTK to register as a voter.


#### 3. Testing ERROR from Admin modifier

(FAILED TEST ON PURPOSE)
Test should throw and error when msg.sender trying to register use a function only the admin can call.


#### 4. Succesful registering

At the end addres of user should return 'true' if they
were successfully registered to vote.


#### 5. Succesful Proposal Registration

Test check for the registered proposal to see if it was succesfully registered.


#### 6. Succesfull Voting

Checking all the function till ADMIN calls tallyVotes() to determine porposal winner. (Make pinguins flt should be the winning proposal with 5 votes.)