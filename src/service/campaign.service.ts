import { CreateCampaign } from "@/data/domain";
import Web3, { Contract } from "web3";
import { Web3Service } from "./web3.service";

export class CampaignService {

    private contract: Contract<any>;

    public constructor(private fromAddress?: string) {
        this.contract = Web3Service.getContract(fromAddress);
    }

    public async addCampaign(campaign: CreateCampaign) {
        console.log("Campaign: ", campaign);

        return this.contract.methods.addCampaign(campaign.title, campaign.description).send();
    }

    public async getLastCampaignId() {
        return this.contract.methods.nextId().call();
    }

    public async getCampaign(id: number) {
        return this.contract.methods.campaigns(id).call();
    }

    public async getCampaigns() {
        return this.contract.methods.campaigns().call();
    }

    public async donate(id: number, amount: number) {
        return this.contract.methods.donate(id).send({
            value: Web3.utils.toWei(amount, "ether")
        })
    }
}