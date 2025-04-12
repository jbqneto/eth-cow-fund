import { CreateCampaign } from "@/data/domain";
import { Contract } from "web3";
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
}