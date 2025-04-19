// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

struct Campaign {
    address author;
    string title;
    string description;
    string imgUrl;
    string videoUrl;
    uint256 balance;
    uint256 goal;
    bool active;
}

contract DonateCrypto {
    uint256 public fee = 100; //wei
    uint256 public nextId;
    address private owner;
    uint256 private collectedFees;

    mapping(uint256 => Campaign) public campaigns;

    modifier OnlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier OnlyAuthor(uint256 id) {
        require(
            campaigns[id].author == msg.sender,
            "Only author can call this"
        );
        _;
    }

    modifier ValidCampaignId(uint256 id) {
        require(id < nextId, "Campaign does not exist");
        _;
    }

    event DonationReceived(
        uint256 indexed id,
        address indexed donor,
        uint256 amount
    );
    event CampaignCreated(
        uint256 indexed id,
        address indexed author,
        string title,
        uint256 goal
    );

    constructor() {
        owner = msg.sender;
    }

    function addCampaign(
        string calldata title,
        string calldata description,
        string calldata imageUrl,
        string calldata videoUrl,
        uint256 goal
    ) public {
        require(bytes(title).length > 0, "Title is required");
        require(bytes(description).length > 0, "Description is required");
        require(goal > 0, "Goal must be greater than zero");

        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.active = true;
        newCampaign.author = msg.sender;
        newCampaign.imgUrl = imageUrl;
        newCampaign.videoUrl = videoUrl;
        newCampaign.goal = goal;

        campaigns[nextId] = newCampaign;

        emit CampaignCreated(nextId, msg.sender, title, goal);

        nextId++;
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory result = new Campaign[](nextId);

        for (uint256 i = 0; i < nextId; ++i) {
            result[i] = campaigns[i];
        }

        return result;
    }

    function donate(uint256 id) public payable ValidCampaignId(id) {
        Campaign storage campaign = campaigns[id];

        require(campaign.active == true, "Campaign is not active");
        require(msg.value > 0, "Donation must be > 0");

        campaign.balance += msg.value;

        //goal archieved
        if (campaign.balance >= campaign.goal) {
            campaign.active = false;
        }

        emit DonationReceived(id, msg.sender, msg.value);
    }

    function withdrawFees() public OnlyOwner {
        require(collectedFees > 0, "You don't have enough fees.");

        uint256 amount = collectedFees;
        collectedFees = 0;

        (bool sent, ) = payable(owner).call{value: amount}("");

        require(sent, "Fee withdrawal failed");
    }

    function withdraw(uint256 id) public ValidCampaignId(id) OnlyAuthor(id) {
        Campaign storage campaign = campaigns[id];

        require(campaign.active == true, "Cant withdraw from closed campaign.");
        require(
            campaign.balance > fee,
            "You dont have enough money to withdraw"
        );

        //Effects
        uint256 amount = campaign.balance - fee;

        collectedFees += fee;
        campaign.balance = 0;
        campaign.active = false;

        address payable recipient = payable(campaign.author);

        //Interactions
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}
