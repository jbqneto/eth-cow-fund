// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

struct Campaign {
    address author;
    string title;
    string description;
    uint256 balance;
    bool active;
}
 
contract DonateCrypto {
    
    uint256 public fee = 100; //wei
    uint256 public nextId;
    
    mapping(uint256 => Campaign) public campaigns;

    function addCampaign(string calldata title, string calldata description) public {
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.active = true;
        newCampaign.author = msg.sender;

        nextId++;

        campaigns[nextId] = newCampaign;
    }

    function donate(uint256 id) public payable {
        require (campaigns[id].active == true, "Campaign is not active");
        require(msg.value > 0, "You must send a donation value > 0");

        campaigns[id].balance += msg.value;
    }

    function withdraw(uint256 id) public {
        Campaign memory campaign = campaigns[id];

        require(campaign.author == msg.sender, "You cant withdraw from this campaign");
        require(campaign.active == true, "Cant withdraw from closed campaign.");
        require(campaign.balance > fee, "You dont have enough money to withdraw");

        address payable recipient = payable(campaign.author);

        recipient.call{value: campaign.balance - fee}("");

        campaigns[id].balance = 0;
        campaigns[id].active = false;

    }

}