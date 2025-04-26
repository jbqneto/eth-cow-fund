import { Campaign, ICampaign } from "@/data/domain";
import { formatWalletAddress, toEth } from "@/lib/evmUtils";

export function toCampaignType(dto: any): Omit<ICampaign, 'id'> {
    return {
        creator: formatWalletAddress(dto.author),
        description: dto.description ?? "",
        title: dto.title ?? "",
        goal: toEth(dto.goal ?? 0),
        image: dto.imgUrl ?? "",
        raised: toEth(dto.balance ?? 0),
        closed: !!dto.active,
        isFunded: dto.balance ? (dto.balance >= dto.goal) : false,
    }
}

export function toCampaignClass(id: string, dto: any): Campaign {
    return Campaign.fromType({
        id,
        ...toCampaignType(dto)
    })
}

export function fromContract(rawCampaign: any, id?: number | string): Campaign {
    const obj = new Campaign();
    obj.title = rawCampaign.title;
    obj.description = rawCampaign.description;
    obj.image = rawCampaign.imgUrl;
    obj.creator = rawCampaign.author;
    obj.id = id?.toString() ?? "";
    obj.raised = toEth(rawCampaign.balance ?? 0n);
    obj.goal = toEth(rawCampaign.goal ?? 0n);
    obj.isFunded = rawCampaign.active ?? false;
    obj.closed = !rawCampaign.active;

    return obj;
}