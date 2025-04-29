import { CreateCampaign } from "@/data/domain";
import { toWei } from "@/lib/evmUtils";
import { Contract } from "web3";
import { Web3Service } from "./web3.service";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export class CampaignService {
    private contractAddress: string;
    private contract: Contract<any>;
    private static instance: CampaignService;

    private constructor() {
        this.contract = Web3Service.getContract(CONTRACT_ADDRESS);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CampaignService();
        }

        return this.instance;
    }

    public async addCampaign(address: string, campaign: CreateCampaign) {
        const contract = Web3Service.getContract(CONTRACT_ADDRESS, address);

        return contract.methods.addCampaign(
            campaign.title,
            campaign.description,
            campaign.image,
            campaign.video ?? "",
            BigInt(campaign.goal ?? "0")
        )
            .send();
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
        const value = toWei(amount);

        const gas = await this.contract.methods.donate(id).estimateGas({
            from: walletAddress,
            value
        });

        console.log(`(${CONTRACT_ADDRESS}) Wallet: ${walletAddress} > id: ${id} > value: ${value} (gas: ${gas})`);

        return Web3Service.web3.eth.sendTransaction({
            from: walletAddress,
            to: CONTRACT_ADDRESS,
            value: BigInt(value),
            data: this.contract.methods.donate(id).encodeABI()
        });
    }
}
