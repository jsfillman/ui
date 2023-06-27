/* NarrativeControlOrgs */
import { FC, useId } from 'react';
import { getNarrativeOrgs, getUserOrgs } from '../../common/api/orgsApi';
import { Button, Select } from '../../common/components';
import { NarrativeDoc } from '../../common/types/NarrativeDoc';

export interface OrgsValues {
  narrativeOrgs: string[];
}

export const Orgs: FC<{
  narrativeDoc: NarrativeDoc;
  no: () => void;
  yes: ({ id }: { id: string }) => () => void;
}> = ({ narrativeDoc, no, yes }) => {
  const orgs = getNarrativeOrgs.useQuery(narrativeDoc.access_group);
  const userOrgs = getUserOrgs.useQuery();
  // eslint-disable-next-line no-console
  console.log({ orgs, userOrgs });
  const orgSelectId = useId();
  if (!userOrgs.currentData) return <></>;
  return (
    <>
      <p>Organizations</p>

      <div>
        <label htmlFor={orgSelectId}>New Organization</label>
        <Select
          options={userOrgs.currentData.map(({ name }) => ({
            value: name,
            label: name,
          }))}
        />
        <Button onClick={yes({ id: orgSelectId })}>OK</Button>
        <Button onClick={no}>Cancel</Button>
      </div>
    </>
  );
};
