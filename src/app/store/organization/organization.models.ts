import { Organization } from "src/app/shared/types/invoice";

export interface organizationState {
    loading: boolean,
    error: any,
    status: any,
    organization: Organization
}