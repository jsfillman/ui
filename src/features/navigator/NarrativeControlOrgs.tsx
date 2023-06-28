/* NarrativeControlOrgs */
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FC, useEffect, useId, useState } from 'react';
import {
  getNarrativeOrgs,
  getUserOrgs,
  OrgInfo,
} from '../../common/api/orgsApi';
import { Button, Select } from '../../common/components';
import { NarrativeDoc } from '../../common/types/NarrativeDoc';

export interface OrgsValues {
  narrativeOrgs: string[];
}

export const Orgs: FC<{
  narrativeDoc: NarrativeDoc;
  no: () => void;
  yesFactory: ({ orgSelected }: { orgSelected: string }) => () => void;
}> = ({ narrativeDoc, no, yesFactory }) => {
  const [orgSelected, setOrgSelected] = useState('');
  const narrativeOrgsQuery = getNarrativeOrgs.useQuery(
    narrativeDoc.access_group
  );
  const userOrgsQuery = getUserOrgs.useQuery();
  useEffect(() => {
    if (narrativeOrgsQuery.isSuccess && userOrgsQuery.isSuccess) {
      // eslint-disable-next-line no-console
      console.log({ narrativeOrgsQuery, userOrgsQuery });
    }
  });
  const orgSelectId = useId();
  if (!userOrgsQuery.currentData || !narrativeOrgsQuery.currentData) {
    return <></>;
  }
  const narrativeOrgs = narrativeOrgsQuery.currentData;
  console.log({ narrativeOrgs }); // eslint-disable-line no-console

  /*
  const OrgInfos: FC<{ orgInfo: OrgInfo }> = ({ orgInfo }) => {
    return <li>{orgInfo.name}</li>;
  };
  */
  return (
    <>
      <p>Organizations</p>

      <div>
        <label htmlFor={orgSelectId}>New Organization</label>
        <Select
          options={userOrgsQuery.currentData.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          onChange={(opts) => {
            console.log({ value: opts[0].value }); // eslint-disable-line no-console
            const orgSelectedByUser = opts[0].value.toString();
            setOrgSelected(orgSelectedByUser);
          }}
        />
        {narrativeOrgs.length === 0 ? (
          <></>
        ) : (
          <>
            <p>Organizations this Narrative is linked to:</p>
            <ul>
              {narrativeOrgs.map(({ name, id }: OrgInfo) => (
                <a href={`/dev/#orgs/${id}`}>
                  <FAIcon icon={faArrowUpRightFromSquare} />
                  <li key={id}>{name}</li>
                </a>
              ))}
            </ul>
          </>
        )}
        <Button onClick={yesFactory({ orgSelected })}>OK</Button>
        <Button onClick={no}>Cancel</Button>
      </div>
    </>
  );
};
