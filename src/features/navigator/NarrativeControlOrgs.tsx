/* NarrativeControlOrgs */
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../common/components';
import { inputRegisterFactory } from '../../common/components/Input.common';
import { Input } from '../../common/components/Input';
import { NarrativeDoc } from '../../common/types/NarrativeDoc';

export interface OrgsValues {
  narrativeOrgs: string[];
}

export const Orgs: FC<{
  narrativeDoc: NarrativeDoc;
  no: () => void;
  yesFactory: ({ getValues }: { getValues: () => OrgsValues }) => () => void;
}> = ({ narrativeDoc, no, yesFactory }) => {
  const { formState, getValues, register } = useForm<OrgsValues>({
    defaultValues: {
      narrativeOrgs: [],
    },
    mode: 'all',
  });
  const inputRegister = inputRegisterFactory<OrgsValues>({
    formState,
    register,
  });
  return (
    <>
      <p>Organizations</p>

      <div>
        <Input
          label={<>New Organization </>}
          {...inputRegister('narrativeOrgs', {
            /* validations */
          })}
        />
        <Button onClick={yesFactory({ getValues })}>OK</Button>
        <Button onClick={no}>Cancel</Button>
      </div>
    </>
  );
};
