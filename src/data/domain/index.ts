export type CreateCampaign = {
    title: string;
    description: string;
    image: string;
    creator: string;
}

export type Campaign = CreateCampaign & {
    id: string;
    raised: number;
    goal: number;
    isFunded?: boolean;
    closed?: boolean;
}