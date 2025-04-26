export type CreateCampaign = {
    title: string;
    description: string;
    image: string;
    video?: string;
    goal: string;
    creator: string;
}

export type ICampaign = CreateCampaign & {
    id: string;
    raised: string;
    isFunded?: boolean;
    closed?: boolean;
}

export class Campaign implements ICampaign {
    goal: string;
    title: string;
    description: string;
    image: string;
    video?: string;
    creator: string;
    id: string;
    raised: string;
    isFunded?: boolean;
    closed?: boolean;

    public getGoal(): number {
        return parseFloat(this.goal ?? '0');
    }

    public getRaised(): number {
        return parseFloat(this.raised ?? '0');
    }

    public static fromType(dto: ICampaign): Campaign {
        const obj = new Campaign();
        obj.title = dto.title;
        obj.description = dto.description;
        obj.image = dto.image;
        obj.creator = dto.creator;
        obj.id = dto.id;
        obj.raised = dto.raised;
        obj.goal = dto.goal;
        obj.isFunded = dto.isFunded ?? false;
        obj.closed = dto.closed ?? false;

        return obj;
    }

}