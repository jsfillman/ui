/* orgsApi.ts */
import { uriEncodeTemplateTag as encode } from '../utils/stringUtils';
import { httpService } from './utils/serviceHelpers';
import { baseApi } from './index';

const orgsService = httpService({
  url: '/services/groups/rpc',
});

export interface OrgInfo {
  id: string;
  owner: string; // user id
  name: string;
  role: string;
  private: boolean;
}

export interface OrgsParams {
  getNarrativeOrgs: number;
}

export interface OrgsResults {
  getNarrativeOrgs: OrgInfo[];
}

export const orgsApi = baseApi
  .enhanceEndpoints({ addTagTypes: ['Orgs'] })
  .injectEndpoints({
    endpoints: (builder) => ({
      getNarrativeOrgs: builder.query<string[], OrgsParams['getNarrativeOrgs']>(
        {
          query: (id) =>
            orgsService({
              method: 'GET',
              url: encode`/group?resourcetype=workspace&resource=${id}`,
            }),
          providesTags: ['Orgs'],
        }
      ),
    }),
  });

export const { getNarrativeOrgs } = orgsApi.endpoints;
export const clearCacheAction = orgsApi.util.invalidateTags(['Orgs']);
