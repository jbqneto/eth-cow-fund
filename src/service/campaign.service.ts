import { CreateCampaign } from "@/data/domain";
import Web3, { Contract } from "web3";
import { Web3Service } from "./web3.service";

export class CampaignService {

    private contract: Contract<any>;
    private static instance: CampaignService;

    private constructor() {
        this.contract = Web3Service.getContract(import.meta.env.VITE_CONTRACT_ADDRESS);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CampaignService();
        }

        return this.instance;
    }

    public async addCampaign(address: string, campaign: CreateCampaign) {
        console.log("Creating Campaign: ", campaign);

        return this.contract.methods.addCampaign(
            campaign.title,
            campaign.description,
            campaign.image,
            campaign.video ?? "",
            campaign.goal ?? "0"
        )
            .send({ from: address });
    }

    public async getLastCampaignId() {
        return this.contract.methods.nextId().call();
    }

    public async getCampaign(id: number) {
        return this.contract.methods.campaigns(id).call();
    }

    public async getCampaigns() {
        try {
            return await this.contract.methods.getAllCampaigns().call();
        } catch (error) {
            console.error("Error fetching campaigns:", error);
            throw error; // Re-throw the error after logging it
        }
    }

    public async donate(walletAddress: string, id: number, amount: string) {
        return this.contract.methods.donate(id).send({
            from: walletAddress,
            value: Web3.utils.toWei(amount, "ether")
        })
    }
}
